// 定義一個快取(緩存)的名稱
const CACHE_NAME = 'book-gallery-cache-v1';

// 這是您的網站需要離線儲存的「所有檔案清單」
const urlsToCache = [
  '.', // '.' 代表 'index.html' 所在的根目錄
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
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
  'audio/不會寫字的獅子.m4a',
  'audio/什麼都有書店.m4a',
  'audio/只是玩笑話為什麼不能說.m4a',
  'audio/我有理由.m4a',
  'audio/我有意見.m4a',
  'audio/怎麼睡成這樣子.m4a', // 您的HTML中這個檔案名稱和圖片檔不同，這是正確的
  'audio/原來發明筷子不是為了吃飯.m4a',
  'audio/逃離吧腳就是用來跑的.m4a',
  'audio/猜猜我在比什麼.m4a',
  'audio/童話裡的建築大師.m4a'
];

// 事件 1：安裝 (Install)
// 當瀏覽器第一次讀取到 sw.js 時，會觸發 'install' 事件
self.addEventListener('install', (event) => {
  // 等待快取作業完成
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // 將清單中所有的檔案都加入快取
        return cache.addAll(urlsToCache);
      })
  );
});

// 事件 2：讀取 (Fetch)
// 當您在線上或離線時，瀏覽器要讀取任何資源 (圖片/聲音/網頁) 都會觸發 'fetch'
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 檢查快取中是否有這個檔案
    caches.match(event.request)
      .then((response) => {
        // 如果快取中有 (response)，就直接從快取回傳
        if (response) {
          return response;
        }
        // 如果快取中沒有，就嘗試從網路去抓
        return fetch(event.request);
      })
  );
});
