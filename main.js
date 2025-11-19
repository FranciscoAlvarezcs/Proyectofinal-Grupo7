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

function animacionCarrousel() {
    const carouselElement = document.getElementById('customCarousel');
    let hasAnimatedOnce = false;
    function runAnimations(slide) {
        const animatedElements = slide.querySelectorAll('.anim-fade-up');
        animatedElements.forEach(el => {
            el.classList.add('animate-now');
        });
    }
    function resetAnimations(slide) {
        const animatedElements = slide.querySelectorAll('.anim-fade-up');
        animatedElements.forEach(el => {
            el.classList.remove('animate-now');
        });
    }
    carouselElement.addEventListener('slide.bs.carousel', function (event) {
        const oldSlide = carouselElement.querySelectorAll('.carousel-item')[event.from];
        if (oldSlide) {
            resetAnimations(oldSlide);
        }
    });
    carouselElement.addEventListener('slid.bs.carousel', function (event) {
        const newSlide = carouselElement.querySelectorAll('.carousel-item')[event.to];
        if (newSlide) {
            runAnimations(newSlide);
        }
    });
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const carouselObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedOnce) {
                const initialActiveSlide = document.querySelector('#customCarousel .carousel-item.active');
                if (initialActiveSlide) {
                    runAnimations(initialActiveSlide);
                }
                hasAnimatedOnce = true;
                observer.unobserve(carouselElement);
            }
        });
    }, observerOptions);
    carouselObserver.observe(carouselElement);
}
animacionCarrousel();
