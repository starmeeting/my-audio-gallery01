// ----------------------------------------------------
//  Service Worker (sw.js) 離線管家程式碼
//  (v4 安全版：修正所有錯字 + 強化容錯)
// ----------------------------------------------------

// v4 版快取
const CACHE_NAME = 'reading-audio-cache-v4';

// 1. 核心檔案 (必須全部成功)
const CORE_FILES = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json'
];

// 2. 內容檔案 (允許部分失敗)
const CONTENT_FILES = [
  // PWA 圖示
  'image/icon-192.png',
  'image/icon-512.png',
  
  // 書本封面 (已修正 '怎麼睡成...' 的錯字)
  'image/不會寫字的獅子.jpg',
  'image/什麼都有書店.jpg',
  'image/只是玩笑話為什麼不能說.jpg',
  'image/我有理由.jpg',
  'image/我有意見.jpg',
  'image/怎麼睡成這個樣子.jpg', // 【已修正】
  'image/原來發明筷子不是為了吃飯.jpg',
  'image/逃離吧腳就是用來跑的.jpg',
  'image/猜猜我在比什麼.jpg',
  'image/童話裡的建築大師.jpg',
  
  // 音訊檔案 (已修正 '只是玩笑話...' 和 '怎麼睡成...' 的錯字)
  'audio/不會寫字的獅子.m4a',
  'audio/什麼都有書店.m4a',
  'audio/原來發明筷子不是為了吃飯.m4a',
  'audio/只是玩笑話為什麼不能說.m4a', // 【已修正】
  'audio/怎麼睡成這樣子.m4a',           // 【已修正】
  'audio/我有意見.m4a',
  'audio/我有理由.m4a',
  'audio/猜猜我在比什麼.m4a',
  'audio/童話裡的建築大師.m4a',
  'audio/逃離吧腳就是用來跑的.m4a'
];

// --- 安裝 (Install) 事件 ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker v4: 正在快取核心檔案...');
      
      // 1. 先快取「核心檔案」(必須成功)
      return cache.addAll(CORE_FILES).then(() => {
        console.log('Service Worker v4: 正在快取內容檔案 (一個一個)...');
        
        // 2. 再快取「內容檔案」(一個一個來，允許失敗)
        const cachePromises = CONTENT_FILES.map((url) => {
          return cache.add(url).catch((err) => {
            // 如果某個檔案快取失敗，只在主控台顯示警告，但「不會」讓安裝失敗
            console.warn(`Service Worker v4: 跳過：${url} (無法快取 - ${err})`);
          });
        });
        
        // 等待所有內容檔案都嘗試過
        return Promise.all(cachePromises);
      });
    })
  );
});

// --- 擷取 (Fetch) 事件 ---
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果快取中有，就從快取回傳
        if (response) {
          return response;
        }
        // 如果快取中沒有，才嘗試從網路抓取
        return fetch(event.request);
      })
  );
});

// --- 啟用 (Activate) 事件 ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 刪除所有不是 v4 的舊快取
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker v4: 正在刪除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
