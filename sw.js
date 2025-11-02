// ----------------------------------------------------
//  Service Worker (sw.js) 離線管家程式碼
// ----------------------------------------------------

// v1 版快取名稱
const CACHE_NAME = 'reading-audio-cache-v1';

// ！！【非常重要】請將您所有的檔案都列在這裡 ！！
const FILES_TO_CACHE = [
  '/', // 這個代表根目錄，一定要加
  'index.html',
  'manifest.json',
  'style.css',
  'script.js',

  // 您剛剛加入的圖示
  'image/icon-192.png',
  'image/icon-512.png',

  // 
  // --- ↓↓↓ 您的音訊檔案 ↓↓↓ ---
  // 
  // 您必須手動把 'audio' 資料夾中的「所有音檔」都加進來
  // 範例如下 (請依照您的檔名修改)：
  //
  // 'audio/第一本書.mp3',
  // 'audio/第二本書.mp3',
  // 'audio/another-file.wav',
  //
  // --- ↑↑↑ 您的音訊檔案 ↑↑↑ ---
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
