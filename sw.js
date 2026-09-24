const CACHE="rala-nordic-shell-v4";
const OFFLINE=["/styles.css?v=3","/manifest.webmanifest?v=4","/icon.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(OFFLINE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const req=event.request;
 if(req.mode==="navigate"){
  event.respondWith(fetch(req,{cache:"no-store"}).catch(()=>caches.match("/index.html").then(r=>r||new Response("RALA NORDIC er offline",{status:503}))));
  return;
 }
 event.respondWith(fetch(req,{cache:"no-store"}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}return response;}).catch(()=>caches.match(req)));
});