// Variables
const resetBtn = document.getElementById('resetBtn');
const sendBtn = document.getElementById('enviar');
const formulario = document.getElementById('enviar-mail');
const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Variables para campos del formulario

const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

// Event Listeners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    // Reinicia el formulario
    resetBtn.addEventListener('click', vaciarFormulario);

}



// Funciones

function iniciarApp() {
    sendBtn.disabled = true;
    sendBtn.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    if (e.target.value.length > 0) {
        e.target.classList.remove('border-red-500');
        e.target.classList.add('border', 'border-green-500');
        limpiarAlerta();
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        if (re.test(e.target.value)) {
            console.log('Email válido');
            e.target.classList.remove('border-red-500');
            e.target.classList.add('border', 'border-green-500');
            limpiarAlerta();
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('El email no es válido');
        }

    }

    if (re.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        console.log('Pasó la validación');
        sendBtn.disabled = false;
        sendBtn.classList.remove('cursor-not-allowed', 'opacity-50');
        
    } 


}

function mostrarError(mensaje) {

    limpiarAlerta();
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function vaciarFormulario(e) {
    e.preventDefault();
    formulario.reset();
    limpiarAlerta();
    email.classList.remove('border', 'border-green-500', 'border-red-500');
    asunto.classList.remove('border', 'border-green-500', 'border-red-500');
    mensaje.classList.remove('border', 'border-green-500', 'border-red-500');
    iniciarApp();
}

function limpiarAlerta() {
    const alerta = document.querySelector('.error');
    if (alerta) {
        alerta.remove();
    }
    
}

function enviarEmail(e){
    e.preventDefault();

    // Mostrar el spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";

    // Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(()=>{
        spinner.style.display = "none";

        // Mensaje que dice que se envió correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje ha sido enviado"
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Insertar parrafo antes de spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
        },3000)
    }, 3000)
    formulario.reset();
    email.classList.remove('border', 'border-green-500', 'border-red-500');
    asunto.classList.remove('border', 'border-green-500', 'border-red-500');
    mensaje.classList.remove('border', 'border-green-500', 'border-red-500');
}