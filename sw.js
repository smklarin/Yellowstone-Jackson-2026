const VERSION='yj-trip-v1.0.0';
const SHELL=[
  './','./index.html','./manifest.webmanifest','./icon-180.png','./icon-512.png'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin===self.location.origin){
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{const copy=res.clone();caches.open(VERSION).then(c=>c.put(event.request,copy));return res;}).catch(()=>caches.match('./index.html'))));
    return;
  }
  // Runtime-cache third-party map/library/route resources after they are viewed once.
  event.respondWith(caches.match(event.request).then(hit=>{
    const net=fetch(event.request).then(res=>{if(res && (res.ok || res.type==='opaque')){const copy=res.clone();caches.open(VERSION).then(c=>c.put(event.request,copy)).catch(()=>{});}return res;}).catch(()=>hit);
    return hit||net;
  }));
});
