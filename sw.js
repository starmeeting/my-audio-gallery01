// ----------------------------------------------------
//  Service Worker (sw.js) 離線管家程式碼
//  (版本：已包含所有音訊檔案)
// ----------------------------------------------------

// v1 版快取名稱
const CACHE_NAME = 'reading-audio-cache-v1';

// ！！所有需要離線快取的檔案列表！！
const FILES_TO_CACHE = [
  '/', // 這個代表根目錄，一定要加
  'index.html',
  'manifest.json',
  'style.css',
  'script.js',

  // 您加入的圖示 (位於 'image' 資料夾)
  'image/icon-192.png',
  'image/icon-512.png',

  // 
  // --- ↓↓↓ 您的音訊檔案 (位於 'audio' 資料夾) ↓↓↓ ---
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
  // --- ↑↑↑ 您的音訊檔案 ↑↑↑ ---
  //
];

// 1. 安裝 (Install) 事件：開啟快取並存入所有檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker 正在快取檔案...');
        // 將 FILES_TO_CACHE 列表中的所有檔案加入快取
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// 2. 擷取 (Fetch) 事件：攔截網路請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 嘗試從快取中尋找相符的請求
    caches.match(event.request)
      .then((response) => {
        // 如果快取中找得到 (response != null)，就直接從快取回傳
        if (response) {
          console.log('從快取提供:', event.request.url);
          return response;
        }

        // 如果快取中找不到，才真的去向網路請求
        console.log('從網路抓取:', event.request.url);
        return fetch(event.request);
      })
  );
});

// ----------------------------------------------------
//  程式碼結束
// ----------------------------------------------------
