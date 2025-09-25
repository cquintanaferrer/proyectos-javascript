// Variables de los elementos del DOM

const mascotaInput = document.getElementById('mascota');
const propietarioInput = document.getElementById('propietario');
const telefonoInput = document.getElementById('telefono');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const sintomasInput = document.getElementById('sintomas');

const formulario = document.getElementById('nueva-cita');
const contenedorCitas = document.getElementById('citas');

// Definiendo clases

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //Creo el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agrego clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta despues e 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }


}

// Instanciando las clases
const ui = new UI();
const administrarCitas = new Citas();



// Event Listeners
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}


// Objeto Principal

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


// Funciones

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validando informacion
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }
    ui.imprimirAlerta('Se agrego correctamente')

    // Generar ID unico
    citaObj.id = Date.now();
    console.log(citaObj);

    // Creando una nueva cita
    administrarCitas.agregarCita({ ...citaObj });
    console.log(administrarCitas);

    // Reiniciar el formulario y el objeto
    reiniciarObjeto();
    formulario.reset();


}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}