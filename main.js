document.addEventListener('DOMContentLoaded', function() {
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const mensajeInput = document.getElementById('mensaje');

    function mostrarError(input, mensaje) {
        const errorPrevio = input.parentElement.querySelector('.error-message');
        if (errorPrevio) {
            errorPrevio.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-2';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.textContent = mensaje;
        input.parentElement.appendChild(errorDiv);
        
        input.style.borderColor = '#dc3545';
    }

    function limpiarError(input) {
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '#5C1D38';
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarTelefono(telefono) {
        const regex = /^[0-9]{8,}$/;
        return regex.test(telefono.replace(/[\s-]/g, ''));
    }

    function validarNombre(nombre) {
        return nombre.trim().length >= 3;
    }

    function validarMensaje(mensaje) {
        return mensaje.trim().length >= 10;
    }

    if (nombreInput) nombreInput.addEventListener('input', () => limpiarError(nombreInput));
    if (emailInput) emailInput.addEventListener('input', () => limpiarError(emailInput));
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            limpiarError(this);
            this.value = this.value.replace(/[^0-9\s-]/g, '');
        });
    }
    if (mensajeInput) mensajeInput.addEventListener('input', () => limpiarError(mensajeInput));

    function mostrarExito() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success position-fixed top-50 start-50 translate-middle';
        successDiv.style.zIndex = '9999';
        successDiv.style.minWidth = '300px';
        successDiv.innerHTML = `
            <h4 class="alert-heading">¡Mensaje enviado!</h4>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
        `;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValido = true;

            if (!validarNombre(nombreInput.value)) {
                mostrarError(nombreInput, 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres)');
                formValido = false;
            }

            if (!validarEmail(emailInput.value)) {
                mostrarError(emailInput, 'Por favor, ingresa un correo electrónico válido');
                formValido = false;
            }

            if (!validarTelefono(telefonoInput.value)) {
                mostrarError(telefonoInput, 'Por favor, ingresa un número de teléfono válido (mínimo 8 dígitos)');
                formValido = false;
            }

            if (!validarMensaje(mensajeInput.value)) {
                mostrarError(mensajeInput, 'Por favor, escribe un mensaje (mínimo 10 caracteres)');
                formValido = false;
            }

            if (formValido) {
                console.log('Formulario válido, datos a enviar:');
                console.log({
                    nombre: nombreInput.value,
                    email: emailInput.value,
                    telefono: telefonoInput.value,
                    mensaje: mensajeInput.value
                });

                mostrarExito();
                form.reset();
            } else {
                const primerError = document.querySelector('.error-message');
                if (primerError) {
                    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

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
    
    if (!carouselElement) return;
    
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

animacionCarrousel(); dev
function animacionCarrousel() {
    const carouselElement = document.getElementById('customCarousel');
    
    if (!carouselElement) return;
    
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
