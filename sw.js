const C='shiftmate-v11-network-first';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
   let copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;
 }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});