// =======================================================
// スライドショー統合ロジック
// =======================================================

// index.htmlの簡易スライドショー用インデックスとクラス名
let simpleSlideIndex = 1;

// drive_weather.htmlのタブ式スライドショー用インデックスとクラス名
// (advanced-mySlidesが使われていると仮定)
let advancedSlideIndex = [1]; 
let advancedSlideId = ["advanced-mySlides"]; 


// -------------------------------------------------------
// 1. ページロード時の初期化
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 簡易スライドショーの初期化 (index.html用)
    if (document.getElementsByClassName("mySlides").length > 0) {
        showSimpleSlides(simpleSlideIndex);
        // ★自動再生を開始する
        autoPlaySimpleSlides(); 
    }
    
    // アドバンスドスライドショーの初期化 (drive_weather.html用)
    // 以前の作業に基づき advanced-mySlides クラスが存在する場合に初期化
    if (document.getElementsByClassName(advancedSlideId[0]).length > 0) {
        showAdvancedSlides(1, 1);
    }
});


// -------------------------------------------------------
// 2. 簡易スライドショー (index.html) の制御関数
// -------------------------------------------------------

// スライド自動切り替え機能
function autoPlaySimpleSlides() {
    let slides = document.getElementsByClassName("mySlides");
    // アドバンスドスライドショーがあるページでは実行しない
    if (slides.length === 0 || document.getElementsByClassName("advanced-slideshow-container").length > 0) return; 

    // スライドを1つ進める
    simpleSlideIndex++;
    if (simpleSlideIndex > slides.length) {
        simpleSlideIndex = 1; // 最後のスライドに達したら最初に戻る
    }
    
    // スライドとドットを更新
    let dots = document.getElementsByClassName("dot");
    
    // スライドとドットの状態をリセット
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (dots.length > i) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    
    slides[simpleSlideIndex - 1].style.display = "block";
    if (dots.length > simpleSlideIndex - 1) {
        dots[simpleSlideIndex - 1].className += " active";
    }

    // 5秒ごとに再実行
    setTimeout(autoPlaySimpleSlides, 5000); 
}

// 前/次へボタンの動作
function plusSlides(n) {
  showSimpleSlides(simpleSlideIndex += n);
}

// ドットナビゲーションの動作
function currentSlide(n) {
  showSimpleSlides(simpleSlideIndex = n);
}

// スライド表示ロジック
function showSimpleSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return;
  
  if (n > slides.length) {simpleSlideIndex = 1}    
  if (n < 1) {simpleSlideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[simpleSlideIndex-1].style.display = "block";  
  dots[simpleSlideIndex-1].className += " active";
}

// -------------------------------------------------------
// 3. アドバンスド・スライドショー (drive_weather.html) の制御関数
// -------------------------------------------------------

// 前/次へボタンの動作
// no: スライドショーのID (今回は常に1)
function plusSlidesAdvanced(n, no) {
  showAdvancedSlides(no, advancedSlideIndex[no - 1] += n);
}

// タブナビゲーションの動作
function currentSlideAdvanced(n, no) {
  showAdvancedSlides(no, advancedSlideIndex[no - 1] = n);
}

// スライド表示ロジック (タブを残し、ドットを削除したバージョン)
function showAdvancedSlides(no, n) {
  let i;
  let slides = document.getElementsByClassName(advancedSlideId[no - 1]);
  let tabs = document.getElementsByClassName("tab-button");

  if (slides.length === 0) return;

  if (n > slides.length) { advancedSlideIndex[no - 1] = 1 }
  if (n < 1) { advancedSlideIndex[no - 1] = slides.length }

  // すべてのスライドを非表示にする
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // タブの active 状態をリセットし、現在地を active にする
  if (no === 1) { 
      for (i = 0; i < tabs.length; i++) {
          tabs[i].className = tabs[i].className.replace(" active", "");
      }
      if (tabs.length > 0) {
        tabs[advancedSlideIndex[no - 1] - 1].className += " active";
      }
  }

  // 現在のスライドを表示する
  slides[advancedSlideIndex[no - 1] - 1].style.display = "block";
}


// -------------------------------------------------------
// 4. HTML側からの呼び出し関数を古いものに合わせて調整
// -------------------------------------------------------
// ページ構造に応じて関数を自動的に振り分けるロジック
if (document.getElementsByClassName("advanced-slideshow-container").length > 0) {
    // アドバンスドスライドショーがページに存在する場合
    window.plusSlides = plusSlidesAdvanced;
    window.currentSlide = currentSlideAdvanced;
} else {
    // 簡易スライドショーがページに存在する場合 (index.htmlなど)
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
}