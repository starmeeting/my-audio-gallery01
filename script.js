document.addEventListener("DOMContentLoaded", () => {
    
    let currentAudio = null; // 用來追蹤目前正在播放的音檔

    // 抓取所有 class 為 .gallery-item 裡面的 img 標籤
    const images = document.querySelectorAll(".gallery-item img");

    images.forEach(img => {
        img.addEventListener("click", () => {
            
            // 檢查：如果點擊時有其他音樂在播，先停止它
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // 取得這張圖片對應的音檔路徑 (來自 index.html 中的 data-audio 屬性)
            const audioPath = img.dataset.audio;

            // 建立一個新的音檔物件
            const audio = new Audio(audioPath);
            
            // 開始播放
            audio.play().catch(error => {
                // 處理瀏覽器可能禁止自動播放的問題
                console.error("播放失敗:", error);
                if (error.name === "NotAllowedError") {
                    alert("瀏覽器限制了自動播放，請再試一次或檢查設定。");
                }
            });

            // 將現在播放的音檔存起來
            currentAudio = audio;

            // 監聽音檔是否播放完畢，播完後清除 currentAudio
            audio.addEventListener("ended", () => {
                currentAudio = null;
            });

            // 錯誤處理 (例如：檔案路徑錯誤 404 Not Found)
            audio.addEventListener("error", (e) => {
                console.error("音檔載入或播放錯誤:", e);
                alert("抱歉，音檔無法播放。\n請檢查檔案路徑是否正確 (大小寫、副檔名、資料夾)。\n錯誤路徑: " + audioPath);
                currentAudio = null;
            });
        });
    });
});
