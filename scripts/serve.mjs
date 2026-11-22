import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

export const root=fileURLToPath(new URL('../dist/',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon'};
export async function handle(req,res){
 if(!['GET','HEAD'].includes(req.method??'')){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
 try{
  let pathname;try{pathname=decodeURIComponent(new URL(req.url??'/','http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  if(pathname.includes('\0')||pathname.includes('\\')){res.writeHead(400);res.end('Bad request');return;}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root)){res.writeHead(403);res.end('Forbidden');return;}
  const info=await stat(file);if(!info.isFile()){res.writeHead(404);res.end('Not found');return;}
  const bytes=req.method==='HEAD'?null:await readFile(file);
  res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]??'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(bytes);
 }catch(e){res.writeHead(e.code==='ENOENT'||e.code==='ENOTDIR'?404:500);res.end(e.code==='ENOENT'||e.code==='ENOTDIR'?'Not found':'Server error');}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{await stat(path.join(root,'index.html'));}catch{console.error('Build missing. Run npm ci, then npm run build.');process.exit(1);}
 const args=process.argv.slice(2);const portFlag=args.indexOf('--port');const hostFlag=args.indexOf('--host');
 const port=Number(portFlag>=0?args[portFlag+1]:process.env.PORT??5173);
 const host=hostFlag>=0?args[hostFlag+1]:process.env.HOST??'127.0.0.1';
 if(!Number.isInteger(port)||port<1||port>65535||!host){console.error('Invalid host or port.');process.exit(1);}
 const server=http.createServer(handle);server.on('error',e=>{console.error(e.message);process.exit(1);});
 server.listen(port,host,()=>{console.log(`Linux workshop: http://${host==='0.0.0.0'?'localhost':host}:${port}`);if(host==='0.0.0.0')console.log(`LAN access: http://YOUR-SERVER-IP:${port}`);});
}
