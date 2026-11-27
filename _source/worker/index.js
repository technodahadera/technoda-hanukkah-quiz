const ROUND_MS = 15_000;
const ROOM_MS = 4 * 60 * 60 * 1000;
const MAX_PLAYERS = 500;
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
  const room = newRoom(cleanKey(key));
  await db.prepare('DELETE FROM quiz_rooms WHERE code IN (SELECT code FROM quiz_rooms WHERE expires <= ? ORDER BY expires LIMIT 16)').bind(now).run();
  const code = playId();
  const result = await db.prepare(
    'INSERT INTO quiz_rooms(code, revision, expires, data) ' +
    'SELECT ?, 0, ?, ? WHERE (SELECT COUNT(*) FROM quiz_rooms WHERE expires > ? AND replaced_by IS NULL) < 250'
  ).bind(code,now + ROOM_MS,JSON.stringify(room),now).run();
  if (result.meta.changes === 1) return {code,token:room.host,state:await view(db,code,room,room.host)};
  message('לא ניתן לפתוח משחק נוסף כרגע. נסו שוב בעוד כמה דקות.',503);
}

function newRoom(key,host = randomToken()) {
  return {host,key,phase:'lobby',index:-1,ends:0};
}

function phaseAt(room,now) {
  return room.phase === 'question' && now >= room.ends ? 'reveal' : room.phase;
}

async function getRanking(db,code,limit) {
  const result = await db.prepare(`
    SELECT p.name, COALESCE(SUM(a.points),0) AS score
    FROM quiz_players p LEFT JOIN quiz_answers a ON a.code = p.code AND a.token = p.token
    WHERE p.code = ? GROUP BY p.token ORDER BY score DESC, p.joined, p.name_key LIMIT ?
  `).bind(code,limit).all();
  return result.results;
}

async function view(db,code,room,token,playerData) {
  const host = room.host === token;
  const now = Date.now();
  const phase = phaseAt(room,now);
  const state = {phase,index:room.index,total:questions.length,ends:room.ends,now};
  if (!host) {
    const self = playerData ?? await db.prepare(`
      SELECT p.name, a.choice AS pick, a.points,
        COALESCE((SELECT SUM(points) FROM quiz_answers WHERE code=p.code AND token=p.token
          AND round <= ?),0) AS score
      FROM quiz_players p LEFT JOIN quiz_answers a
        ON a.code=p.code AND a.token=p.token AND a.round=?
      WHERE p.code=? AND p.token=?
    `).bind(room.index,room.index,code,token).first();
    if (!self || self.name === null) message('החיבור למשחק פג. סרקו שוב את ה־QR.',401);
    state.name = self.name;
    state.pick = self.pick;
    state.score = self.score - (phase === 'question' ? self.points ?? 0 : 0);
    if (phase === 'reveal') state.points = self.points ?? 0;
  } else {
    const count = await db.prepare('SELECT COUNT(*) AS count FROM quiz_players WHERE code=?').bind(code).first();
    state.players = count.count;
    if (phase === 'lobby') {
      const sample = await db.prepare('SELECT name FROM quiz_players WHERE code=? ORDER BY joined, name_key LIMIT 18').bind(code).all();
      state.names = sample.results.map(player => player.name);
    }
  }
  if (phase === 'question' || phase === 'reveal') {
    const {title,choices,kind} = questions[room.index];
    state.question = {title,choices,kind};
    if (host) {
      const options = await db.prepare('SELECT choice, COUNT(*) AS count FROM quiz_answers WHERE code=? AND round=? GROUP BY choice')
        .bind(code,room.index).all();
      state.answered = options.results.reduce((sum,option) => sum + option.count,0);
      if (phase === 'reveal') state.counts = choices.map((_,i) => options.results.find(option => option.choice === i)?.count ?? 0);
    }
  }
  if (phase === 'reveal') {
    state.correct = room.key[room.index];
    state.note = questions[room.index].note;
    if (host) state.ranking = await getRanking(db,code,5);
  }
  if (phase === 'done') state.ranking = room.ranking ?? await getRanking(db,code,10);
  return state;
}

async function join(db,code,room,data) {
  const name = typeof data.name === 'string' ? data.name.trim().replace(/\s+/g,' ') : '';
  if (!name || name.length > 24) message('הקלידו כינוי באורך של עד 24 תווים.');
  const token = data.token;
  if (typeof token !== 'string' || !/^[a-f0-9-]{36}$/.test(token) || token === room.host) message('מזהה שחקן אינו תקין.');
  await db.prepare(`
    INSERT OR IGNORE INTO quiz_players(code,token,name,name_key,joined)
    SELECT code,?,?,?,? FROM quiz_rooms
    WHERE code=? AND expires>? AND replaced_by IS NULL AND json_extract(data,'$.phase') != 'done'
      AND (SELECT COUNT(*) FROM quiz_players WHERE code=?) < ?
  `).bind(token,name,name.toLowerCase(),Date.now(),code,Date.now(),code,MAX_PLAYERS).run();
  const player = await db.prepare('SELECT name FROM quiz_players WHERE code=? AND token=?').bind(code,token).first();
  if (player) return;
  const blocked = await db.prepare(`
    SELECT replaced_by, json_extract(data,'$.phase') AS phase,
      (SELECT COUNT(*) FROM quiz_players WHERE code=?) AS count FROM quiz_rooms WHERE code=?
  `).bind(code,code).first();
  if (!blocked || blocked.replaced_by) message('המנחה פתח משחק חדש. סרקו את ה־QR החדש.',410);
  if (blocked.phase === 'done') message('המשחק הסתיים. אפשר להצטרף למשחק הבא.',409);
  if (blocked.count >= MAX_PLAYERS) message('המשחק הגיע למספר המשתתפים המרבי.',409);
  message('הכינוי תפוס. נסו כינוי אחר.',409);
}

async function advance(db,code,saved,room,data) {
  if (room.host !== data.token) message('רק המנחה יכול לקדם את המשחק.',403);
  if (room.index !== data.index) return;
  const now = Date.now();
  const phase = phaseAt(room,now);
  if (phase !== 'lobby' && phase !== 'reveal') message('ממתינים לסוף זמן המענה.',409);
  if (phase === 'lobby') {
    const player = await db.prepare('SELECT 1 AS present FROM quiz_players WHERE code=? LIMIT 1').bind(code).first();
    if (!player) message('צריך לפחות משתתף אחד כדי להתחיל.',409);
  }
  delete room.players;
  if (room.index + 1 < questions.length) {
    room.index++;
    room.phase = 'question';
    room.roundMs = ROUND_MS;
    room.ends = now + room.roundMs;
  } else {
    room.phase = 'done';
    room.ranking = await getRanking(db,code,10);
  }
  await db.prepare('UPDATE quiz_rooms SET data=?,revision=revision+1 WHERE code=? AND revision=? AND replaced_by IS NULL')
    .bind(JSON.stringify(room),code,saved.revision).run();
}

async function submit(db,code,saved,room,data,receivedAt) {
  if (!Number.isInteger(data.index) || data.index < 0 || data.index >= questions.length) message('השאלה אינה תקינה.');
  const choice = data.choice;
  if (!Number.isInteger(choice) || choice < 0 || choice >= questions[data.index].choices.length) message('בחירה לא תקינה.');
  if (room.index === data.index && phaseAt(room,receivedAt) === 'question') {
    const points = room.key[room.index].includes(choice)
      ? Math.round(500 + 500 * Math.min(1,(room.ends - receivedAt) / (room.roundMs ?? 30_000)))
      : 0;
    const result = await db.prepare(`
      INSERT OR IGNORE INTO quiz_answers(code,token,round,choice,points)
      SELECT p.code,p.token,?,?,? FROM quiz_players p JOIN quiz_rooms r ON r.code=p.code
      WHERE p.code=? AND p.token=? AND r.revision=? AND r.replaced_by IS NULL
    `).bind(data.index,choice,points,code,data.token,saved.revision).run();
    if (result.meta.changes === 1) return;
  }
  const previous = await db.prepare('SELECT 1 AS present FROM quiz_answers WHERE code=? AND token=? AND round=?')
    .bind(code,data.token,data.index).first();
  if (!previous) message('חלון המענה לשאלה נסגר.',409);
}

async function restart(db,code,room,token,replacement) {
  if (room.host !== token) message('רק המנחה יכול להתחיל משחק חדש.',403);
  if (!replacement) {
    const nextCode = playId();
    const fresh = newRoom(room.key,room.host);
    await db.batch([
      db.prepare(`
        INSERT INTO quiz_rooms(code,revision,expires,data)
        SELECT ?,0,?,? FROM quiz_rooms WHERE code=? AND replaced_by IS NULL
      `).bind(nextCode,Date.now()+ROOM_MS,JSON.stringify(fresh),code),
      db.prepare('UPDATE quiz_rooms SET replaced_by=? WHERE code=? AND replaced_by IS NULL').bind(nextCode,code)
    ]);
    const old = await db.prepare('SELECT replaced_by FROM quiz_rooms WHERE code=?').bind(code).first();
    replacement = old.replaced_by;
  }
  const next = await db.prepare('SELECT data,replaced_by FROM quiz_rooms WHERE code=? AND expires>?').bind(replacement,Date.now()).first();
  if (!next || next.replaced_by) message('המשחק כבר הוחלף. פתחו משחק ממסך הפתיחה.',410);
  return {code:replacement,token,state:await view(db,replacement,JSON.parse(next.data),token)};
}

async function migratePlayers(db,code) {
  await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO quiz_players(code,token,name,name_key,joined)
      SELECT r.code,json_extract(p.value,'$.token'),json_extract(p.value,'$.name'),
        lower(json_extract(p.value,'$.name')),CAST(p.key AS INTEGER)
      FROM quiz_rooms r,json_each(r.data,'$.players') p WHERE r.code=?
    `).bind(code),
    db.prepare(`
      INSERT OR IGNORE INTO quiz_answers(code,token,round,choice,points)
      SELECT r.code,json_extract(p.value,'$.token'),CAST(a.key AS INTEGER),
        json_extract(a.value,'$.choice'),json_extract(a.value,'$.points')
      FROM quiz_rooms r,json_each(r.data,'$.players') p,json_each(p.value,'$.picks') a WHERE r.code=?
    `).bind(code),
    db.prepare("UPDATE quiz_rooms SET data=json_remove(data,'$.players'),revision=revision+1 WHERE code=? AND json_type(data,'$.players')='array'")
      .bind(code)
  ]);
}

async function accessGame(db,code,data,action,receivedAt) {
  if (typeof data.token !== 'string' || !/^[a-f0-9-]{36}$/.test(data.token)) message('החיבור למשחק פג. סרקו שוב את ה־QR.',401);
  const saved = action === 'state'
    ? await db.prepare(`
      SELECT r.data,r.replaced_by,p.name,a.choice AS pick,a.points,
        COALESCE((SELECT SUM(points) FROM quiz_answers WHERE code=p.code AND token=p.token),0) AS score
      FROM quiz_rooms r LEFT JOIN quiz_players p ON p.code=r.code AND p.token=?
      LEFT JOIN quiz_answers a ON a.code=p.code AND a.token=p.token AND a.round=json_extract(r.data,'$.index')
      WHERE r.code=? AND r.expires>?
    `).bind(data.token,code,Date.now()).first()
    : await db.prepare('SELECT revision,data,replaced_by FROM quiz_rooms WHERE code=? AND expires>?')
      .bind(code,Date.now()).first();
  if (!saved) message('המשחק לא זמין. בקשו מהמנחה להציג QR עדכני.',404);
  const room = JSON.parse(saved.data);
  if (room.players) {
    if (room.host !== data.token && action !== 'join' && !room.players.some(player => player.token === data.token)) {
      message('החיבור למשחק פג. סרקו שוב את ה־QR.',401);
    }
    await migratePlayers(db,code);
    return accessGame(db,code,data,action,receivedAt);
  }
  if (action === 'restart' || (action === 'state' && saved.replaced_by && room.host === data.token)) {
    return restart(db,code,room,data.token,saved.replaced_by);
  }
  if (saved.replaced_by) message('המנחה פתח משחק חדש. סרקו את ה־QR החדש.',410);
  if (action === 'join') await join(db,code,room,data);
  if (action === 'advance') await advance(db,code,saved,room,data);
  if (action === 'answer') await submit(db,code,saved,room,data,receivedAt);
  if (action === 'state') return {state:await view(db,code,room,data.token,saved)};
  const current = await db.prepare('SELECT data,replaced_by FROM quiz_rooms WHERE code=?').bind(code).first();
  if (!current || current.replaced_by) message('המנחה פתח משחק חדש. סרקו את ה־QR החדש.',410);
  return {state:await view(db,code,JSON.parse(current.data),data.token)};
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
    const route = path.match(/^\/api\/(create|join|state|advance|answer|restart)$/);
    if (!route || request.method !== 'POST') return new Response('Not found',{status:404});
    try {
      const data = await getBody(request);
      const action = route[1];
      if (action === 'create') return Response.json(await createRoom(env.DB,data.key),{headers:apiHeaders});
      if (typeof data.code !== 'string' || !/^(?:[a-f0-9]{32}|[0-9]{6})$/.test(data.code)) message('קישור ההצטרפות אינו תקין. סרקו שוב את ה־QR.');
      const result = await accessGame(env.DB,data.code,data,action,receivedAt);
      return Response.json(result,{headers:apiHeaders});
    } catch (error) {
      if (!(error instanceof GameError)) console.error(error);
      return Response.json({error:error instanceof GameError ? error.message : 'תקלה בחיבור לחידון. נסו שוב.'},
        {status:error instanceof GameError ? error.status : 500,headers:apiHeaders});
    }
  },
};
