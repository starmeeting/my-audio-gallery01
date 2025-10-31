document.addEventListener("DOMContentLoaded", () => {
    
    let currentAudio = null; // 用來追蹤目前正在播放的音檔

    // 抓取所有圖片
    const images = document.querySelectorAll(".gallery-item img");
    // 抓取暫停按鈕
    const pauseBtn = document.getElementById("pauseButton");

    // === 圖片點擊事件 (播放) ===
    images.forEach(img => {
        img.addEventListener("click", () => {
            
            // 檢查：如果點擊時有其他音樂在播，先停止它
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // 取得音檔路徑
            const audioPath = img.dataset.audio;
            const audio = new Audio(audioPath);
            
            // 播放
            audio.play().catch(error => {
                console.error("播放失敗:", error);
            });

            // 存儲當前音檔
            currentAudio = audio;

            // 監聽音檔是否播放完畢
            audio.addEventListener("ended", () => {
                currentAudio = null;
            });

            // 錯誤處理
            audio.addEventListener("error", (e) => {
                console.error("音檔載入或播放錯誤:", e);
                alert("抱歉，音檔無法播放。\n請檢查檔案路徑是否正確。\n錯誤路徑: " + audioPath);
                currentAudio = null;
            });
        });
    });

    // === 暫停按鈕點擊事件 ===
    pauseBtn.addEventListener("click", () => {
        if (currentAudio) {
            currentAudio.pause(); // 暫停當前播放的音樂
        }
    });

});
