const CACHE="rala-nordic-assets-v5";
const OFFLINE=["/styles.css?v=3","/manifest.webmanifest?v=4","/icon.svg"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(OFFLINE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const req=event.request;
 if(req.mode==="navigate"){event.respondWith(fetch(req,{cache:"no-store"}));return;}
 event.respondWith(fetch(req,{cache:"no-store"}).catch(()=>caches.match(req)));
});