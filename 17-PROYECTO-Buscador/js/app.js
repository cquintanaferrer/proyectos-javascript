// Variables
const resultados = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color')

// Variables para determinar el anio actual
const max = new Date().getFullYear();
const min = max - 15

// Genero un objeto para buscar por el
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Event Listeners
eventListeners();


document.addEventListener('DOMContentLoaded', () => {
    cargarDatos(autos);
    llenarSelect();
});



// Event listeners para los select
function eventListeners() {
    // Para select de marca
    marca.addEventListener('change', (e) => {
        datosBusqueda.marca = e.target.value
        filtrarAuto();
    })
    year.addEventListener('change', (e) => {
        datosBusqueda.year = e.target.value
        filtrarAuto();
    })
    minimo.addEventListener('change', (e) => {
        datosBusqueda.minimo = e.target.value
        filtrarAuto();
    })
    maximo.addEventListener('change', (e) => {
        datosBusqueda.maximo = e.target.value
        filtrarAuto();
    })
    puertas.addEventListener('change', (e) => {
        datosBusqueda.puertas = e.target.value
        filtrarAuto();
    })
    transmision.addEventListener('change', (e) => {
        datosBusqueda.transmision = e.target.value
        filtrarAuto();
    })
    color.addEventListener('change', (e) => {
        datosBusqueda.color = e.target.value
        filtrarAuto();
    })
}


// Funciones
function cargarDatos(autos) {

    limpiarHtml();
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;

        const autoHtml = document.createElement('p');
   
        autoHtml.textContent = `${marca} ${modelo} - ${year} - ${puertas} Puertas - Color: ${color} - Transmisión: ${transmision} - Precio: $${precio}`;;

        resultados.appendChild(autoHtml);
    })
}

function noResultado() {
    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultados.appendChild(noResultado);
}

function limpiarHtml() {
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);

    }
}

// Filtraremos usando funciones de alto nivel 
// pasando como parametro a filter una funcion
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(resultado);

    if (resultado.length === 0) {
        noResultado();
    } else {
        cargarDatos(resultado);
    }
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;

}
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}
function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}
