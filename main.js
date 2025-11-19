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