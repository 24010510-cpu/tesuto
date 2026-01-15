/* ======================================================
   コペドラ in 四国 共通スクリプト (script.js)
   ====================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 地域別絞り込み機能 (ドライブマップ用) ---
    // の地域ボタンを制御します
    const regionButtons = document.querySelectorAll('.region-btn');
    const spotCards = document.querySelectorAll('.spot-card');

    if (regionButtons.length > 0) {
        regionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // ボタンの「active」クラスを付け替える
                const activeBtn = document.querySelector('.region-btn.active');
                if (activeBtn) activeBtn.classList.remove('active');
                btn.classList.add('active');

                const region = btn.getAttribute('data-region');

                // カードの表示・非表示を切り替える
                spotCards.forEach(card => {
                    const cardRegion = card.getAttribute('data-region') || "";
                    // 「すべて(all)」が選ばれたか、地域名が含まれていれば表示
                    if (region === 'all' || cardRegion.includes(region)) {
                        card.style.display = 'flex'; // CSSで設定したパネル形式を維持
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 2. 季節別スライドショー機能 (ドライブ日和用) ---
    // のタブ切り替えを制御します
    const slides = document.getElementsByClassName("advanced-mySlides");
    const tabs = document.getElementsByClassName("tab-button");

    if (slides.length > 0) {
        // 初期状態（1番目のスライドを表示）
        showSlides(1);

        // HTML側の onclick="currentSlide(n)" から呼び出せるように公開
        window.currentSlide = function(n) {
            showSlides(n);
        };
    }

    function showSlides(n) {
        if (slides.length === 0) return;

        // すべてのスライドとタブをリセット
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }

        // 指定された番号を表示（配列は0から始まるので -1）
        if (slides[n - 1]) {
            slides[n - 1].style.display = "block";
            tabs[n - 1].classList.add("active");
        }
    }

    // --- 3. スマホ向け横スクロール調整 ---
    // タブやボタンが画面外にある場合、クリック時に中央へ寄せる
    const scrollContainers = document.querySelectorAll('.region-buttons, .tab-navigation');
    scrollContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const rect = e.target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const scrollLeft = e.target.offsetLeft - (containerRect.width / 2) + (rect.width / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        });
    });

});