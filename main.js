document.addEventListener("DOMContentLoaded", function() {
  
  const carouselElement = document.getElementById('customCarousel');
  let hasAnimatedOnce = false;

  // Función para AÑADIR la clase de animación
  function runAnimations(slide) {
    // Busca los elementos DENTRO del slide actual
    const animatedElements = slide.querySelectorAll('.anim-fade-up');
    animatedElements.forEach(el => {
      el.classList.add('animate-now');
    });
  }

  // Función para QUITAR (resetear) la clase de animación
  function resetAnimations(slide) {
    // Busca los elementos DENTRO del slide actual
    const animatedElements = slide.querySelectorAll('.anim-fade-up');
    animatedElements.forEach(el => {
      el.classList.remove('animate-now');
    });
  }

  // ANTES de que un slide se vaya, resetea su animación
  carouselElement.addEventListener('slide.bs.carousel', function (event) {
    // 'event.from' es el índice del slide que se va
    const oldSlide = carouselElement.querySelectorAll('.carousel-item')[event.from];
    if (oldSlide) {
      resetAnimations(oldSlide);
    }
  });

  // DESPUÉS de que un nuevo slide llegue, ejecuta su animación
  carouselElement.addEventListener('slid.bs.carousel', function (event) {
    // 'event.to' es el índice del slide que llegó
    const newSlide = carouselElement.querySelectorAll('.carousel-item')[event.to];
    if (newSlide) {
      runAnimations(newSlide);
    }
  });

  // Lógica del Observador para la primera carga
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Anima cuando el 10% sea visible
  };

  const carouselObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si el carrusel es visible Y no se ha animado antes...
      if (entry.isIntersecting && !hasAnimatedOnce) {
        const initialActiveSlide = document.querySelector('#customCarousel .carousel-item.active');
        if (initialActiveSlide) {
          // Ejecuta la animación de la primera slide
          runAnimations(initialActiveSlide);
        }
        hasAnimatedOnce = true; // Marca que ya se animó
        observer.unobserve(carouselElement); // Deja de observar
      }
    });
  }, observerOptions);

  // Inicia observando el carrusel
  carouselObserver.observe(carouselElement);
  
});