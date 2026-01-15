// ===============================================
// ドライブ日和ページ用 スライドショー自動切替および手動操作機能 (統合版)
// ===============================================

let advancedSlideIndex = 1; // 1から始める
const autoSwitchTime = 5000; // 5秒ごとにスライドを切り替え
let slideInterval; // タイマーIDを保持するための変数

// スライドショーの表示を更新し、自動切替をリセットするメイン関数
function initializeSlideshow() {
    const slides = document.querySelectorAll(".advanced-mySlides");
    if (slides.length === 0) return;
    
    const totalSlides = slides.length;

    // インデックスを範囲内に収める
    if (advancedSlideIndex > totalSlides) {advancedSlideIndex = 1}
    if (advancedSlideIndex < 1) {advancedSlideIndex = totalSlides}

    // すべてのスライドを非表示、タブのハイライトをリセット
    for (let i = 0; i < totalSlides; i++) {
        slides[i].style.display = "none";  
    }
    const tabs = document.querySelectorAll(".tab-button");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    // 現在のスライドを表示し、対応するタブをアクティブにする
    slides[advancedSlideIndex-1].style.display = "block";  
    if (tabs[advancedSlideIndex-1]) {
        tabs[advancedSlideIndex-1].className += " active";
    }

    // 自動切替をクリアしてから再開
    clearInterval(slideInterval);
    slideInterval = setInterval(showNextAdvancedSlide, autoSwitchTime);
}

// 次のスライドを表示する関数 (自動切替用)
function showNextAdvancedSlide() {
    advancedSlideIndex++;
    initializeSlideshow();
}


// 手動でスライドを切り替える関数 (進む/戻るボタン用)
// HTMLの onclick="plusSlides(-1, 1)" に合わせ、2つ目の引数(group)を受け取る
function plusSlides(n, group) {
    advancedSlideIndex += n;
    initializeSlideshow();
}

// 特定のタブをクリックしてスライドを切り替える関数
// HTMLの onclick="currentSlide(1, 1)" に合わせ、2つ目の引数(group)を受け取る
function currentSlide(n, group) {
    advancedSlideIndex = n;
    initializeSlideshow();
}


// ページロード時に実行
document.addEventListener("DOMContentLoaded", initializeSlideshow);