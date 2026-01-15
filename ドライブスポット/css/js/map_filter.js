// ===============================================
// ドライブマップ検索 フィルタリング機能 (ピン連動機能を削除)
// ===============================================
function filterSpots(selectedRegion) {
    const buttons = document.querySelectorAll('.region-btn');
    const spots = document.querySelectorAll('.spot-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`.region-btn[data-region="${selectedRegion}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    spots.forEach(spot => {
        const spotRegions = spot.getAttribute('data-region');
        
        if (selectedRegion === 'all' || spotRegions.includes(selectedRegion)) {
            spot.style.display = 'block';
        } else {
            spot.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.region-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            filterSpots(region);
        });
    });
    filterSpots('all');
});