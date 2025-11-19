document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');

    cards.forEach(card => {
        const overlay = card.querySelector('.info-overlay');

        card.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(10px)';
        });

        overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        overlay.style.transform = 'translateY(10px)';
    });

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const overlay = card.querySelector('.info-overlay');
            const isVisible = overlay.style.opacity === '1';
            
            if (isVisible) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(10px)';
            } else {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });
    });
});