document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.campo');
    const nombreInput = inputs[0];
    const emailInput = inputs[1];
    const telefonoInput = inputs[2];
    const mensajeInput = form.querySelector('.campo-mensaje');

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
        input.style.borderColor = '#a30000';
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

    nombreInput.addEventListener('input', () => limpiarError(nombreInput));
    emailInput.addEventListener('input', () => limpiarError(emailInput));
    telefonoInput.addEventListener('input', () => limpiarError(telefonoInput));
    mensajeInput.addEventListener('input', () => limpiarError(mensajeInput));

    telefonoInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9\s-]/g, '');
    });

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
});