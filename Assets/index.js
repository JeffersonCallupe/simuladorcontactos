// Función para guardar el array de contactos dentro del Local Storage
function guardarContactos() {
    localStorage.setItem('contactos', JSON.stringify(contactos));
}

// Obtener referencia al input de imagen y a la vista previa
const inputImagen = document.getElementById('imagen');
const vistaPrevia = document.getElementById('vistaPrevia');
const labelImagen = document.getElementById('labelImagen');


// Evento para visualizar la imagen cargada con la API 
inputImagen.addEventListener('change', function(event) {
    const archivo = event.target.files[0]; 

    if (archivo) {
        const reader = new FileReader(); 
        reader.onload = function(e) {
            vistaPrevia.src = e.target.result; 
            vistaPrevia.style.display = 'block';
            // labelImagen.style.display = 'none';
            // inputImagen.style.display = 'none';
        };
        reader.readAsDataURL(archivo);
    } else {
        vistaPrevia.style.display = 'none'; 
    }
});



function obtenerContactos() {
    const contactosGuardados = localStorage.getItem('contactos');
    return contactosGuardados ? JSON.parse(contactosGuardados) : [];
}

let contactos = obtenerContactos();



// Función para agregar un nuevo contacto
function agregarContacto(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const celular = document.getElementById('celular').value;
    const correo = document.getElementById('correo').value;
    const imagen = vistaPrevia.src; 
    if (nombre === '' || celular === '' || correo === '' || imagen === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const nuevoContacto = { nombre, celular, correo, imagen };
    contactos.push(nuevoContacto);
    guardarContactos();
    document.querySelector('.contactoFormulario').reset();
    vistaPrevia.style.display = 'none';
    mostrarContactos();
}



// Función en donde se muestra los contactos añadidos
function mostrarContactos() {
    const lista = document.querySelector('.main__listaContacto');
    lista.innerHTML = '';

    contactos.forEach((contacto, index) => {
        const contactoHTML = `
        <div class="contacto" id="contacto-${index}">
            <figure class="contacto__container"> 
            <img src="${contacto.imagen}" alt="${contacto.nombre}" class="contacto__img" >    
            </figure>
            <p><strong>Nombre:</strong> ${contacto.nombre}</p>
            <p><strong>Celular:</strong> ${contacto.celular}</p>
            <p><strong>Correo:</strong> ${contacto.correo}</p>
            <button onclick="editarContacto(${index})" class="contacto__editar">Editar</button>
            <button onclick="eliminarContacto(${index})" class="contacto__eliminar">Eliminar</button>
        </div>`;
        lista.innerHTML += contactoHTML;
    });
}


// Función para eliminar
function eliminarContacto(index) {
    contactos.splice(index, 1); 
    guardarContactos(); 
    mostrarContactos(); 
}


// Función para editar
function editarContacto(index) {
    const contacto = contactos[index];
    document.getElementById('nombre').value = contacto.nombre;
    document.getElementById('celular').value = contacto.celular;
    document.getElementById('correo').value = contacto.correo;
    eliminarContacto(index);
}


// Evento para agregar al formulario
document.querySelector('.contactoFormulario').addEventListener('submit', agregarContacto);

// Evento para mostrar contactos
document.addEventListener('DOMContentLoaded', mostrarContactos);
