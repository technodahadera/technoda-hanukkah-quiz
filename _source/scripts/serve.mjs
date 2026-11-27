import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';

await import('./build.mjs');
const {default:worker} = await import('../dist/server/index.js');
const database = new DatabaseSync(':memory:');
database.exec('PRAGMA foreign_keys=ON');
for (const file of ['0000_quiz_rooms.sql','0001_quiz_participants.sql']) {
  database.exec(await readFile(new URL('../drizzle/'+file,import.meta.url),'utf8'));
}
const DB = {
  prepare(sql) {
    const statement = database.prepare(sql);
    return {
      bind(...values) {
        return {
          first: async () => statement.get(...values),
          all: async () => ({results:statement.all(...values)}),
          exec: () => ({meta:statement.run(...values)}),
          run: async () => ({meta:statement.run(...values)})
        };
      }
    };
  },
  async batch(statements) {
    database.exec('BEGIN');
    try {
      const results = statements.map(statement => statement.exec());
      database.exec('COMMIT');
      return results;
    } catch (error) {
      database.exec('ROLLBACK');
      throw error;
    }
  }
};

const args = process.argv.slice(2);
const port = Number(args.includes('--port') ? args[args.indexOf('--port')+1] : process.env.PORT || 3000);
const host = args.includes('--host') ? args[args.indexOf('--host')+1] : '127.0.0.1';
createServer(async (req,res) => {
  try {
    const method = req.method;
    const request = new Request(new URL(req.url,'http://localhost:'+port),{
      method,headers:req.headers,
      ...(method === 'GET' || method === 'HEAD' ? {} : {body:req,duplex:'half'})
    });
    const answer = await worker.fetch(request,{DB});
    res.writeHead(answer.status,Object.fromEntries(answer.headers));
    res.end(Buffer.from(await answer.arrayBuffer()));
  } catch (error) {
    console.error(error);
    res.writeHead(500).end();
  }
}).listen(port,host,() => console.log('Quiz preview on port',port));
