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

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
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

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregar al arreglo de carrito

    
    carritoHTML();
}

// Funcion para mostrar el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML
    
    limpiarHTML();

    articulosCarrito.forEach(curso=> {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                img src="${imagen}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class ="borrar-curso" data-id = "${curso.id}"> X </a> 
            </td>
        `;
        contenedorCarrito.appendChild(row);
    } )

    
}

// Funcion para eliminar un curso del carrito

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Funcion para limpiar el HTML

function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
