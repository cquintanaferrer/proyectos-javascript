// Variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

// Creando funcion para registrar eventos

cargarEventListeners();

function cargarEventListeners() {
    // Cuando se agrega un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}



// Funciones

// Funcion que agrega curso al carrito

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
};

// Funcion que lee datos del curso

function leerDatosCurso(curso){
    
    // Creo objeto con el contenido del curso seleccionado

    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1

    }

    //Agregar al arreglo de carrito

    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);
   
    carritoHTML();
}

// Funcion para mostrar el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML
    
    limpiarHTML();

    articulosCarrito.forEach(curso=> {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;
        contenedorCarrito.appendChild(row);
    } )

    

}

// Funcion para limpiar el HTML

function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}