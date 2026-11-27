const ROUND_MS = 30_000;
const ROOM_MS = 4 * 60 * 60 * 1000;
const MAX_PLAYERS = 100;
const randomToken = () => crypto.randomUUID();
const playId = () => randomToken().replaceAll('-','');
const pagesOrigin = 'https://technodahadera.github.io';

class GameError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function message(text, status) {
  throw new GameError(text,status);
}

function cleanKey(key) {
  if (!Array.isArray(key) || key.length !== questions.length) message('מפתח התשובות אינו תקין.');
  return key.map((choices,index) => {
    if (!Array.isArray(choices) || choices.length > 4 || choices.some(choice =>
      !Number.isInteger(choice) || choice < 0 || choice >= questions[index].choices.length
    )) message('מפתח התשובות אינו תקין.');
    return [...new Set(choices)];
  });
}

async function createRoom(db,key) {
  const now = Date.now();
  const room = { host:randomToken(), key:cleanKey(key), phase:'lobby', index:-1, ends:0, players:[] };
  await db.prepare('DELETE FROM quiz_rooms WHERE expires <= ?').bind(now).run();
  for (let i = 0; i < 5; i++) {
    const code = playId();
    const result = await db.prepare(
      'INSERT OR IGNORE INTO quiz_rooms(code, revision, expires, data) ' +
      'SELECT ?, 0, ?, ? WHERE (SELECT COUNT(*) FROM quiz_rooms) < 250'
    ).bind(code,now + ROOM_MS,JSON.stringify(room)).run();
    if (result.meta.changes === 1) return {code,token:room.host,state:view(room, room.host)};
  }
  message('לא ניתן לפתוח משחק נוסף כרגע. נסו שוב בעוד כמה דקות.',503);
}

function phaseAt(room,now) {
  return room.phase === 'question' && now >= room.ends ? 'reveal' : room.phase;
}

function view(room,token) {
  const host = room.host === token;
  const self = room.players.find(player => player.token === token);
  if (!host && !self) message('החיבור למשחק פג. סרקו שוב את ה־QR.',401);
  const now = Date.now();
  const phase = phaseAt(room,now);
  const state = {phase,index:room.index,total:questions.length,ends:room.ends,now,players:room.players.length};
  if (phase === 'lobby' && host) state.names = room.players.map(player => player.name);
  if (self) {
    state.name = self.name;
    state.pick = self.picks[room.index]?.choice ?? null;
    state.score = sumPoints(self, phase === 'question' ? room.index - 1 : room.index);
  }
  if (phase === 'question' || phase === 'reveal') {
    const {title,choices,kind} = questions[room.index];
    state.question = {title,choices,kind};
    if (host) state.answered = room.players.filter(player => player.picks[room.index]).length;
  }
  if (phase === 'reveal') {
    state.correct = room.key[room.index];
    state.note = questions[room.index].note;
    if (host) {
      state.counts = state.question.choices.map((_,i) =>
        room.players.filter(player => player.picks[room.index]?.choice === i).length);
    }
    if (self) state.points = self.picks[room.index]?.points ?? 0;
  }
  if (phase === 'reveal' && host || phase === 'done') {
    state.ranking = room.players.map(player => ({name:player.name,score:sumPoints(player,room.index)}))
      .sort((a,b) => b.score-a.score).slice(0,phase === 'done' ? 10 : 5);
  }
  return state;
}

function sumPoints(player,index) {
  return Object.entries(player.picks).reduce((sum,[round,answer]) => sum + (Number(round) <= index ? answer.points : 0),0);
}

function join(room,data) {
  const name = typeof data.name === 'string' ? data.name.trim().replace(/\s+/g,' ') : '';
  if (!name || name.length > 24) message('הקלידו כינוי באורך של עד 24 תווים.');
  const token = data.token;
  if (typeof token !== 'string' || !/^[a-f0-9-]{36}$/.test(token) || token === room.host) message('מזהה שחקן אינו תקין.');
  const existing = room.players.find(player => player.token === token);
  if (existing) return false;
  if (room.phase !== 'lobby') message('המשחק כבר התחיל. אפשר להצטרף בסיבוב הבא.',409);
  if (room.players.length >= MAX_PLAYERS) message('המשחק הגיע למספר המשתתפים המרבי.',409);
  if (room.players.some(player => player.name.toLowerCase() === name.toLowerCase())) message('הכינוי תפוס. נסו כינוי אחר.',409);
  room.players.push({name,token,picks:{}});
  return true;
}

function advance(room,data) {
  if (room.host !== data.token) message('רק המנחה יכול לקדם את המשחק.',403);
  if (room.index !== data.index) return false;
  const now = Date.now();
  const phase = phaseAt(room,now);
  if (phase !== 'lobby' && phase !== 'reveal') message('ממתינים לסיום 30 השניות.',409);
  if (phase === 'lobby' && !room.players.length) message('צריך לפחות משתתף אחד כדי להתחיל.',409);
  if (room.index + 1 < questions.length) {
    room.index++;
    room.phase = 'question';
    room.ends = now + ROUND_MS;
  } else {
    room.phase = 'done';
  }
  return true;
}

function submit(room,data,receivedAt) {
  const player = room.players.find(p => p.token === data.token);
  if (!player) message('יש להצטרף למשחק כדי לענות.',401);
  if (player.picks[data.index]) return false;
  if (room.index !== data.index || phaseAt(room,receivedAt) !== 'question') message('חלון המענה לשאלה נסגר.',409);
  const choice = data.choice;
  if (!Number.isInteger(choice) || choice < 0 || choice >= questions[room.index].choices.length) message('בחירה לא תקינה.');
  const points = room.key[room.index].includes(choice)
    ? Math.round(500 + 500 * Math.min(1,(room.ends - receivedAt) / ROUND_MS))
    : 0;
  player.picks[room.index] = {choice,points};
  return true;
}

async function mutateRoom(db,code,data,action,receivedAt) {
  for (let attempt = 0; attempt < 48; attempt++) {
    const saved = await db.prepare('SELECT revision, data FROM quiz_rooms WHERE code = ? AND expires > ?')
      .bind(code,Date.now()).first();
    if (!saved) message('המשחק לא זמין. בקשו מהמנחה להציג QR עדכני.',404);
    const room = JSON.parse(saved.data);
    const changed = action === 'join' ? join(room,data)
      : action === 'advance' ? advance(room,data)
      : action === 'answer' ? submit(room,data,receivedAt)
      : false;
    if (!changed) return {state:view(room,data.token)};
    const result = await db.prepare('UPDATE quiz_rooms SET data = ?, revision = revision + 1 WHERE code = ? AND revision = ?')
      .bind(JSON.stringify(room),code,saved.revision).run();
    if (result.meta.changes === 1) return {state:view(room,data.token)};
    await new Promise(resolve => setTimeout(resolve,5 + Math.random()*25));
  }
  message('יש עומס במשחק. נסו שוב.',503);
}

async function getBody(request) {
  const input = await request.text();
  if (input.length > 8192) message('הבקשה גדולה מדי.',413);
  try {
    const value = JSON.parse(input);
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  } catch {
    // Return the same message for malformed JSON and unsupported payloads.
  }
  message('הבקשה אינה תקינה.');
}

const noStore = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const pageHeaders = {...noStore,'Content-Security-Policy':
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://technodahadera.github.io; media-src 'self' https://technodahadera.github.io; frame-ancestors 'self'; base-uri 'none'; form-action 'self'"};

export default {
  async fetch(request,env) {
    const receivedAt = Date.now();
    const path = new URL(request.url).pathname;
    if (request.method === 'GET' && ['/', '/join', '/host'].includes(path)) {
      return new Response(HTML,{headers:{...pageHeaders,'Content-Type':'text/html; charset=utf-8'}});
    }
    if (request.method === 'GET' && path === '/app.js') {
      return new Response(CLIENT,{headers:{...noStore,'Content-Type':'text/javascript; charset=utf-8'}});
    }
    const cors = request.headers.get('Origin') === pagesOrigin
      ? {'Access-Control-Allow-Origin':pagesOrigin,'Vary':'Origin'}
      : {'Vary':'Origin'};
    const apiHeaders = {...noStore,...cors};
    if (request.method === 'OPTIONS' && path.startsWith('/api/')) {
      return new Response(null,{status:204,headers:{...apiHeaders,
        'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'600'}});
    }
    if (request.method === 'GET' && path === '/api/questions') {
      return Response.json(questions,{headers:apiHeaders});
    }
    const route = path.match(/^\/api\/(create|join|state|advance|answer)$/);
    if (!route || request.method !== 'POST') return new Response('Not found',{status:404});
    try {
      const data = await getBody(request);
      const action = route[1];
      if (action === 'create') return Response.json(await createRoom(env.DB,data.key),{headers:apiHeaders});
      if (typeof data.code !== 'string' || !/^(?:[a-f0-9]{32}|[0-9]{6})$/.test(data.code)) message('קישור ההצטרפות אינו תקין. סרקו שוב את ה־QR.');
      const result = await mutateRoom(env.DB,data.code,data,action,receivedAt);
      return Response.json(result,{headers:apiHeaders});
    } catch (error) {
      if (!(error instanceof GameError)) console.error(error);
      return Response.json({error:error instanceof GameError ? error.message : 'תקלה בחיבור לחידון. נסו שוב.'},
        {status:error instanceof GameError ? error.status : 500,headers:apiHeaders});
    }
  },
};
