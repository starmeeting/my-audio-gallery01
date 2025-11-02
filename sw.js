// ----------------------------------------------------
//  Service Worker (sw.js) 離線管家程式碼
//  (最終版：包含所有音訊與圖片)
// ----------------------------------------------------

// v2 版快取 (更新版本號以觸發更新)
const CACHE_NAME = 'reading-audio-cache-v2';

// ！！所有需要離線快取的檔案列表！！
const FILES_TO_CACHE = [
  '/', // 這個代表根目錄，一定要加
  'index.html',
  'manifest.json',
  'style.css',
  'script.js',

  // 您的 PWA 圖示
  'image/icon-192.png',
  'image/icon-512.png',

  // 
  // --- ↓↓↓ 您的10張書本封面圖檔 ↓↓↓ ---
  // 
  'image/不會寫字的獅子.jpg',
  'image/什麼都有書店.jpg',
  'image/只是玩笑話為什麼不能說.jpg',
  'image/我有理由.jpg',
  'image/我有意見.jpg',
  'image/怎麼睡成這個樣子.jpg',
  'image/原來發明筷子不是為了吃飯.jpg',
  'image/逃離吧腳就是用來跑的.jpg',
  'image/猜猜我在比什麼.jpg',
  'image/童話裡的建築大師.jpg',
  //
  // --- ↑↑↑ 您的10張書本封面圖檔 ↑↑↑ ---
  // 

  // 
  // --- ↓↓↓ 您的10個音訊檔案 ↓↓↓ ---
  // 
  'audio/不會寫字的獅子.m4a',
  'audio/什麼都有書店.m4a',
  'audio/原來發明筷子不是為了吃飯.m4a',
  'audio/只是開玩笑為什麼不能說.m4a',
  'audio/怎麼睡成這樣子.m4a',
  'audio/我有意見.m4a',
  'audio/我有理由.m4a',
  'audio/猜猜我在比什麼.m4a',
  'audio/童話裡的建築大師.m4a',
  'audio/逃離吧腳就是用來跑的.m4a'
  //
  // --- ↑↑↑ 您的10個音訊檔案 ↑↑↑ ---
  //
];

// 1. 安裝 (Install) 事件：開啟快取並存入所有檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker 正在快取所有檔案 (v2)...');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// 2. 擷取 (Fetch) 事件：攔截網路請求
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

// 3. 啟用 (Activate) 事件：刪除舊的快取
// (這能確保您更新 sw.js 後，平板會抓到新的 v2 快取)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker 正在刪除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
