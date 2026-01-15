<script>
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. おすすめスポット：カテゴリ検索タグ機能
    // ==========================================
    const filterTags = document.querySelectorAll('.filter-tag');
    const spotCards = document.querySelectorAll('.spot-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // アクティブなボタンの見た目を切り替え
            document.querySelector('.filter-tag.active')?.classList.remove('active');
            tag.classList.add('active');

            const target = tag.getAttribute('data-target');

            spotCards.forEach(card => {
                // 「すべて」が選ばれたか、カードが持つクラスがターゲットと一致するか
                if (target === 'all' || card.classList.contains(target)) {
                    card.style.display = 'flex'; // 表示（CSSのPCレイアウト維持のためflex）
                } else {
                    card.style.display = 'none'; // 非表示
                }
            });
        });
    });

    // ==========================================
    // 2. ドライブマップ：地域別絞り込み機能
    // ==========================================
    const regionButtons = document.querySelectorAll('.region-btn');

    regionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.region-btn.active')?.classList.remove('active');
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');
            
            spotCards.forEach(card => {
                // 地域（data-region属性）による絞り込み
                if (region === 'all' || card.getAttribute('data-region') === region) {
                    // カテゴリ絞り込みの状態も考慮する場合はここを調整
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 3. ドライブ日和：季節タブ＆スライドショー
    // ==========================================
    let slideIndex = 1;
    showSlides(slideIndex);

    // タブをクリックした時の処理
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("advanced-mySlides");
        let tabs = document.getElementsByClassName("tab-button");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // すべてのスライドを隠す
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        // すべてのタブから active クラスを消す
        for (i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" active", "");
        }

        // 指定されたスライドとタブを表示
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            tabs[slideIndex - 1].className += " active";
        }
    }

    // ==========================================
    // 4. スマホ向け：横スクロール位置の自動調整
    // ==========================================
    // タブをクリックした際、そのボタンが画面中央に来るようにスクロール
    const scrollContainers = document.querySelectorAll('.tab-navigation, .spot-filter-tags');
    
    scrollContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const rect = e.target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const scrollLeft = e.target.offsetLeft - (containerRect.width / 2) + (rect.width / 2);
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        });
    });
});
</script>