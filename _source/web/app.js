const app = document.querySelector('#app');
const letters = ['א׳','ב׳','ג׳','ד׳'];
const storageKey = 'technoda-hanukkah-live-session';
const quizUrl = new URL('./',document.currentScript.src);
const pagesOrigin = 'https://technodahadera.github.io';
const apiOrigin = location.origin === pagesOrigin ? 'https://technoda-hanukkah-quiz.workspace-022996.chatgpt.site' : '';
const musicUrl = new URL('answer-music.mp3',location.origin === pagesOrigin
  ? quizUrl : pagesOrigin + '/technoda-hanukkah-quiz/');
const currentUrl = new URL(location.href);
const requestedPlay = currentUrl.searchParams.get('play') ?? '';
const joinPage = location.pathname === '/join' || currentUrl.searchParams.has('play');
const hostPage = !joinPage;
let session;
let state;
let poll;
let clock;
let status;
let busy = false;
let pendingChoice = null;
let connectionIssue = '';
let offset = 0;
let bank;
let audioContext;
let audioBuffer;
let audioTrack;
let trackRound;
let muted = false;
let musicButton;

function prepareMusic() {
  if (muted) return;
  try {
    audioContext ??= new AudioContext();
    void audioContext.resume().then(syncMusic).catch(() => {});
    audioBuffer ??= fetch(musicUrl).then(response => {
      if (!response.ok) throw new Error('Music unavailable');
      return response.arrayBuffer();
    }).then(buffer => audioContext.decodeAudioData(buffer)).catch(() => {
      audioBuffer = undefined;
      return null;
    });
  } catch { /* gameplay remains available when browser audio is disabled */ }
}

function stopMusic() {
  if (audioTrack) {
    audioTrack.stop();
    audioTrack = undefined;
  }
  trackRound = undefined;
}

function syncMusic() {
  if (muted || session?.role !== 'host' || state?.phase !== 'question') {
    stopMusic();
    return;
  }
  if (!audioBuffer || audioContext?.state !== 'running' || trackRound === state.index) return;
  const index = state.index;
  const active = session;
  void audioBuffer.then(buffer => {
    if (!buffer || muted || active !== session || state?.phase !== 'question' ||
        state.index !== index || trackRound === index || audioContext.state !== 'running') return;
    const seconds = Math.min(30,(state.ends-Date.now()-offset)/1000);
    if (seconds <= 0) return;
    stopMusic();
    trackRound = index;
    const track = audioContext.createBufferSource();
    track.buffer = buffer;
    track.loop = buffer.duration < 30;
    track.connect(audioContext.destination);
    track.start(0,(30-seconds) % buffer.duration);
    track.stop(audioContext.currentTime + seconds);
    track.onended = () => {
      if (audioTrack === track) audioTrack = undefined;
    };
    audioTrack = track;
  });
}


function node(tag,className = '',content = '') {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
}
function button(text,onClick,style = '') {
  const element = node('button','btn '+style,text);
  element.type = 'button';
  if (onClick) element.addEventListener('click',onClick);
  return element;
}
function link(title,path) {
  const element = node('a','',title);
  element.href = path;
  return element;
}
function field(title,options = {}) {
  const label = node('label','',title);
  const input = Object.assign(node('input'),options);
  label.append(input);
  return {label,input};
}
function focus(element) {
  element.tabIndex = -1;
  element.focus({preventScroll:true});
}
function errorText(error) {
  return error.status ? error.message : 'החיבור נותק. מנסים להתחבר שוב.';
}
async function api(action,payload) {
  const response = await fetch(apiOrigin + '/api/' + action, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
    signal:AbortSignal.timeout(8000)
  });
  const result = await response.json();
  if (!response.ok) throw Object.assign(new Error(result.error),{status:response.status});
  return result;
}
function saveSession(info) {
  session = info;
  try { sessionStorage.setItem(storageKey,JSON.stringify(info)); } catch { /* session still works in memory */ }
}
function stopSession() {
  stopMusic();
  musicButton.hidden = true;
  clearTimeout(poll);
  clearInterval(clock);
  session = undefined;
  state = undefined;
  try { sessionStorage.removeItem(storageKey); } catch { /* storage can be unavailable */ }
}
function setup(failure = '') {
  clearInterval(clock);
  const hero = node('section','hero');
  const copy = node('div','hero-copy');
  copy.append(node('h1','','חידון חנוכה'),node('p','muted','27 שאלות · 30 שניות לכל שאלה'));
  const art = node('div','hero-art');
  art.setAttribute('aria-hidden','true');
  const lights = node('div','lights');
  for (let i=0; i<9; i++) lights.append(node('span','candle'));
  art.append(lights);
  hero.append(copy,art);

  const modes = node('div','live-types');
  if (!joinPage) modes.append(hostSetup());
  if (!hostPage) modes.append(joinSetup());
  const warning = node('p','note',failure);
  warning.hidden = !failure;
  app.replaceChildren(hero,warning,modes);
}
function hostSetup() {
  const panel = node('section','card stack');
  const output = node('p','muted game-status');
  output.setAttribute('role','status');
  const open = button('פתיחת משחק',async () => {
    prepareMusic();
    open.disabled = true;
    output.textContent = 'פותחים משחק…';
    try {
      const questions = await loadBank();
      const data = await api('create',{key:questions.map(q => q.correct)});
      saveSession({code:data.code,token:data.token,role:'host'});
      acceptState(data.state);
      refresh();
    } catch (error) {
      output.textContent = errorText(error);
      open.disabled = false;
    }
  },'primary');
  const details = node('details');
  details.append(node('summary','','מפתח תשובות והערות למורה'));
  details.addEventListener('toggle',async () => {
    if (!details.open || details.children.length > 1) return;
    const list = node('div','key-list','טוענים את המפתח…');
    details.append(list);
    try {
      const questions = await loadBank();
      list.textContent = '';
      questions.forEach((q,index) => {
        const card = node('section','key-item');
        const answers = node('div','key-options');
        const scoring = node('span','muted',q.correct.length ? '' : 'ללא ניקוד');
        q.choices.forEach((choice,i) => {
          const label = node('label',q.correct.includes(i) ? 'key-green' : '');
          const check = node('input');
          check.type = 'checkbox';
          check.checked = q.correct.includes(i);
          check.addEventListener('change',() => {
            q.correct = check.checked ? [...q.correct,i] : q.correct.filter(value => value !== i);
            label.classList.toggle('key-green',check.checked);
            scoring.textContent = q.correct.length ? '' : 'ללא ניקוד';
          });
          label.append(check,document.createTextNode(choice));
          answers.append(label);
        });
        card.append(node('strong','',(index + 1) + '. ' + q.title),answers,scoring);
        if (q.note) card.append(node('p','note',q.note));
        list.append(card);
      });
    } catch (error) {
      list.remove();
      output.textContent = errorText(error);
    }
  });
  panel.append(node('h2','','הנחיית משחק'),node('p','muted','פתחו משחק במחשב והקרינו את ה־QR להצטרפות.'),open,details,output);
  return panel;
}
async function loadBank() {
  if (!bank) {
    const response = await fetch(apiOrigin + '/api/questions');
    if (!response.ok) throw new Error('Question bank unavailable');
    bank = await response.json();
  }
  return bank;
}
function joinSetup() {
  const panel = node('form','card stack');
  if (!/^[a-f0-9]{32}$/.test(requestedPlay)) {
    panel.append(node('h2','','הצטרפות מהטלפון'),
      node('p','muted','סרקו את ה־QR שהמנחה מקרין כדי להצטרף למשחק.'));
    return panel;
  }
  const name = field('כינוי',{maxLength:24,placeholder:'איך תרצו להופיע במשחק?',required:true,autocomplete:'off'});
  const action = button('הצטרפות למשחק',null,'primary');
  action.type = 'submit';
  const output = node('p','muted game-status');
  output.setAttribute('role','status');
  let identity;
  panel.addEventListener('submit',async event => {
    event.preventDefault();
    if (action.disabled) return;
    action.disabled = true;
    output.textContent = 'מתחברים…';
    identity ??= crypto.randomUUID();
    const play = requestedPlay;
    const token = identity;
    try {
      const data = await api('join',{code:play,name:name.input.value,token});
      saveSession({code:play,token,role:'player'});
      acceptState(data.state);
      refresh();
    } catch (error) {
      output.textContent = errorText(error);
      action.disabled = false;
    }
  });
  panel.append(node('h2','','הצטרפות מהטלפון'),name.label,action,output);
  return panel;
}
function acceptState(fresh) {
  if (state) {
    const phaseOrder = {lobby:0,question:1,reveal:2,done:3};
    if (fresh.index < state.index ||
        (fresh.index === state.index && phaseOrder[fresh.phase] < phaseOrder[state.phase]) ||
        fresh.now < state.now) return;
  }
  const before = state;
  offset = fresh.now - Date.now();
  state = fresh;
  syncMusic();
  if (!before || before.index !== fresh.index || fresh.pick != null || fresh.phase !== 'question') pendingChoice = null;
  const fingerprint = view => JSON.stringify({...view,now:0});
  if (!before || fingerprint(before) !== fingerprint(fresh) || connectionIssue) {
    connectionIssue = '';
    render(!before || before.phase !== fresh.phase || before.index !== fresh.index);
  }
}
async function refresh() {
  const active = session;
  if (!active) return;
  try {
    const data = await api('state',active);
    if (session !== active) return;
    acceptState(data.state);
  } catch (error) {
    if (session !== active) return;
    if ([401,404].includes(error.status)) {
      stopSession();
      setup(errorText(error));
      return;
    }
    if (!connectionIssue) setStatus(errorText(error));
    connectionIssue = errorText(error);
  }
  if (session === active && (state?.phase !== 'done' || connectionIssue)) poll = setTimeout(refresh,1150);
}
function setStatus(text) {
  if (status) status.textContent = text;
}
async function send(action,payload) {
  if (busy) return;
  if (action === 'advance') prepareMusic();
  busy = true;
  const active = session;
  const index = state.index;
  if (action === 'answer') {
    pendingChoice = payload.choice;
    render(false);
  }
  try {
    const data = await api(action,{...active,index,...payload});
    if (session === active) acceptState(data.state);
  } catch (error) {
    if (session === active && state.index === index) {
      pendingChoice = null;
      busy = false;
      render(false);
      setStatus(errorText(error));
    }
  } finally {
    busy = false;
    if (session === active && state?.phase === 'question' && pendingChoice === null) {
      const controls = app.querySelectorAll('.answer');
      controls.forEach(control => { control.disabled = session.role === 'host' || state.pick != null || remaining() <= 0; });
    }
  }
}
function remaining() {
  return Math.max(0,Math.ceil((state.ends-Date.now()-offset)/1000));
}
function tick(time,bar,answerGrid) {
  const value = remaining();
  time.textContent = value ? value + ' שניות' : 'הזמן נגמר';
  bar.style.width = (value/30*100) + '%';
  if (!value) answerGrid.querySelectorAll('button').forEach(control => { control.disabled = true; });
}
function render(shouldFocus) {
  clearInterval(clock);
  status = node('p','muted game-status');
  status.setAttribute('role','status');
  const screen = node('section','card stack');
  const isHost = session.role === 'host';
  musicButton.hidden = !isHost;
  let heading;
  if (state.phase === 'lobby') {
    heading = node('h1','',isHost ? 'מצטרפים למשחק' : 'הצטרפת למשחק!');
    screen.append(heading);
    if (isHost) lobby(screen);
    else screen.append(node('p','muted',state.name + ' · ממתינים שהמנחה יתחיל'));
  } else if (state.phase === 'done') {
    heading = node('h1','','תוצאות החידון');
    screen.append(heading);
    if (!isHost) screen.append(node('h2','',state.score + ' נקודות'));
    screen.append(ranking(state.ranking));
  } else {
    heading = showRound(screen,isHost);
  }
  const footer = node('div','actions');
  footer.append(button(state.phase === 'done' ? 'חזרה למסך הפתיחה' : 'יציאה מהמשחק',() => {
    if (state.phase !== 'done' && !confirm('לצאת מהמשחק?')) return;
    stopSession();
    setup();
  },'subtle'));
  if (!isHost && state.phase !== 'lobby') footer.append(node('p','muted',state.name + ' · ' + state.score + ' נקודות'));
  screen.append(status,footer);
  app.replaceChildren(screen);
  if (shouldFocus) focus(heading);
}
function createQr(url) {
  const qr = new QRCode(-1,0);
  qr.addData(url);
  qr.make();
  const canvas = node('canvas','qr-canvas');
  const side = qr.getModuleCount();
  const padding = 4;
  const scale = 8;
  canvas.width = canvas.height = (side + 2*padding)*scale;
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','QR להצטרפות למשחק');
  const context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.fillStyle = '#101019';
  for (let row=0; row<side; row++) {
    for (let col=0; col<side; col++) {
      if (qr.isDark(row,col)) context.fillRect((col+padding)*scale,(row+padding)*scale,scale,scale);
    }
  }
  return canvas;
}
function lobby(screen) {
  screen.classList.add('lobby');
  const joinUrl = new URL(quizUrl);
  joinUrl.searchParams.set('play',session.code);
  const share = node('div','actions');
  const joinLink = link('קישור להצטרפות',joinUrl.href);
  joinLink.target = '_blank';
  joinLink.rel = 'noopener';
  share.append(joinLink,button('העתקת קישור',async () => {
    try {
      await navigator.clipboard.writeText(joinUrl.href);
      setStatus('הקישור הועתק.');
    } catch { setStatus(joinUrl.href); }
  },'subtle'));
  const players = node('div','scoreline');
  state.names.forEach(name => players.append(node('span','chip',name)));
  const start = button('התחלת משחק',() => send('advance',{}),'primary');
  start.disabled = state.players === 0;
  const overview = node('div','join-lobby');
  const panel = node('div','stack');
  panel.append(node('h2','','סרקו כדי להצטרף'),share,
    node('p','muted',state.players + ' משתתפים'),players,start);
  overview.append(createQr(joinUrl.href),panel);
  screen.append(overview);
}
function ranking(entries) {
  const list = node('ol','score-rank');
  for (const item of entries) {
    const row = node('li','',item.name);
    row.append(node('span','',String(item.score)));
    list.append(row);
  }
  return list;
}
function showRound(screen,isHost) {
  const revealed = state.phase === 'reveal';
  const q = state.question;
  const heading = node('h1','prompt',q.title);
  const equation = 'x^x = 25';
  if (q.title.includes(equation)) {
    const start = q.title.indexOf(equation);
    heading.replaceChildren(document.createTextNode(q.title.slice(0,start)),
      node('bdi','math',equation),document.createTextNode(q.title.slice(start+equation.length)));
  }
  const meta = node('div','meta');
  const time = node('span','count timer');
  meta.append(node('p','muted','שאלה ' + (state.index+1) + ' מתוך ' + state.total));
  if (isHost) meta.append(node('p','muted',state.answered + ' מתוך ' + state.players + ' ענו'));
  if (!revealed) meta.append(time);
  const track = node('div','track');
  const bar = node('span');
  track.setAttribute('aria-hidden','true');
  track.append(bar);
  const grid = node('div','answers');
  q.choices.forEach((choice,i) => {
    const answer = node('button','answer');
    answer.type = 'button';
    const selected = (state.pick ?? pendingChoice) === i;
    const correct = revealed && state.correct.includes(i);
    answer.append(node('span','letter',correct ? '✓' : letters[i]));
    if (q.kind === 'colors' && /^[0-9a-f]{6}$/i.test(choice)) {
      const swatch = node('span','swatch');
      swatch.style.backgroundColor = '#' + choice;
      swatch.setAttribute('aria-hidden','true');
      answer.append(swatch);
    }
    if (q.kind === 'images') {
      const img = node('img');
      img.alt = choice + ' — ' + ['אזור עור אחיד','אזור עור עם נקודה כהה אחת','אזור עור עם נקודות קטנות רבות בגוון חום בהיר','אזור עור עם קווים בהירים'][i];
      img.src = skinSamples[i];
      answer.append(img);
    } else {
      const label = node('span','',choice);
      if (q.kind === 'colors') label.dir = 'ltr';
      answer.append(label);
    }
    if (revealed && isHost) answer.append(node('span','chip',String(state.counts[i])));
    if (correct) answer.classList.add('correct');
    if (selected) answer.classList.add('selected');
    answer.setAttribute('aria-pressed',String(selected));
    answer.disabled = isHost || revealed || state.pick != null || pendingChoice !== null;
    answer.addEventListener('click',() => send('answer',{choice:i}));
    grid.append(answer);
  });
  screen.classList.toggle('player-question',!isHost);
  screen.append(meta);
  if (!revealed) screen.append(track);
  screen.append(heading,grid);
  if (!revealed) {
    if (state.pick != null) screen.append(node('p','muted','התשובה נשלחה. ממתינים לסיום הזמן.'));
    if (pendingChoice !== null) screen.append(node('p','muted','שולחים את התשובה…'));
    tick(time,bar,grid);
    clock = setInterval(() => tick(time,bar,grid),200);
    return heading;
  }
  const scoring = state.correct.length > 0;
  if (!scoring) screen.append(node('p','muted','השאלה הזו ללא ניקוד.'));
  if (scoring && !isHost) {
    const result = state.points ? 'תשובה נכונה! קיבלת ' + state.points + ' נקודות.'
      : state.pick == null ? 'לא נשלחה תשובה.' : 'התשובה הנכונה מסומנת בירוק.';
    screen.append(node('p',state.points ? 'feedback good' : 'muted',result));
  }
  if (state.note) screen.append(node('p','note',state.note));
  if (isHost) {
    screen.append(node('h2','','מובילים'),ranking(state.ranking));
    const final = state.index+1 === state.total;
    screen.append(button(final ? 'לתוצאות הסופיות' : 'לשאלה הבאה',() => send('advance',{}),'primary'));
  }
  return heading;
}

const fullscreen = document.querySelector('#fullscreen');
musicButton = button('השתקת מוזיקה',() => {
  muted = !muted;
  musicButton.textContent = muted ? 'הפעלת מוזיקה' : 'השתקת מוזיקה';
  if (muted) stopMusic();
  else prepareMusic();
},'subtle');
musicButton.hidden = true;
fullscreen.before(musicButton);
if (!document.fullscreenEnabled || joinPage) fullscreen.hidden = true;
fullscreen.addEventListener('click',async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { fullscreen.textContent = 'מסך מלא אינו זמין כאן'; }
});
document.addEventListener('fullscreenchange',() => {
  fullscreen.textContent = document.fullscreenElement ? 'יציאה ממסך מלא' : 'מסך מלא';
});
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey));
  if (saved && (!joinPage || (saved.role === 'player' && saved.code === requestedPlay)) &&
      (!hostPage || saved.role === 'host')) session = saved;
} catch { /* start a new session */ }
setup();
if (session) refresh();
