import { mkdir, readFile, writeFile } from 'node:fs/promises';
const read = file => readFile(new URL('../' + file, import.meta.url), 'utf8');
const [html, skin, qr, client, questions, api] = await Promise.all([
  'web/index.html', 'web/skin.js', 'web/qr.js', 'web/app.js', 'worker/questions.js', 'worker/index.js'
].map(read));
const bundle = [skin, qr, client].join('\n');
const code = [
  'const HTML = ' + JSON.stringify(html.replace('src="./app.js"', 'src="/app.js"')) + ';',
  'const CLIENT = ' + JSON.stringify(bundle) + ';',
  questions.replace(/^export /, ''),
  api,
].join('\n');
await Promise.all([
  mkdir(new URL('../dist/server/', import.meta.url), {recursive:true}),
  mkdir(new URL('../dist/pages/', import.meta.url), {recursive:true})
]);
await Promise.all([
  writeFile(new URL('../dist/server/index.js', import.meta.url),code),
  writeFile(new URL('../dist/pages/index.html', import.meta.url),html),
  writeFile(new URL('../dist/pages/app.js', import.meta.url),bundle)
]);
