document.addEventListener('DOMContentLoaded', function(){
    cargarCarrito();
});

function actualizarCarrito() {
    var carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    var listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = '';
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(li);
    }
};

/* document.getElementsByClassName("agregar-carrito").addEventListener("click", function () {
    let producto = { id: 1, nombre: "Producto 1", precio: 10 };
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito.push(producto);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}); */

function agregarProducto(event) {
    let producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio'),
        cantidad: 1,
        //total: event.target.getAttribute('data-precio')
    };

    var carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    let match = false;
    for (let i = 0; i < carrito.length; i++) {
        console.log("comparar" + carrito[i].id + " y " + producto.id );
        if (carrito[i].id === producto.id) {
            console.log("suma uno");
            carrito[i].cantidad += 1;
            carrito[i].precio = parseFloat(carrito[i].precio);
            //carrito[i].total = parseFloat(carrito[i].cantidad) * parseFloat(producto.precio);
            match = true;
        };
    }
    if (match == false) {
        carrito.push(producto);    
    };
    
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalCarrito = document.getElementById('total-carrito');
    let totalProductos = document.getElementById('total-productos');
    listaCarrito.innerHTML = '';
    totalCarrito.textContent = '0';

    var carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    let preciototal = 0;
    let sumaProductos = 0;
    let total = 0;
    for (var i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        preciototal = producto.cantidad * producto.precio
        let li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + preciototal + '  (' + producto.cantidad + ') ';
        listaCarrito.appendChild(li);
        sumaProductos += parseInt(producto.cantidad);

        // Sumar el precio al total (convertimos a número)
        total += parseFloat(preciototal) || 0;
    }

    // Guarda la cantidad de productos
    sessionStorage.setItem('totalProductos', JSON.stringify(sumaProductos));
    totalProductos.textContent = sumaProductos;

    sessionStorage.setItem('total', JSON.stringify(total));
    // Mostrar el total redondeado a 2 decimales
    totalCarrito.textContent = total.toFixed(2);
}

// Agregar producto al carrito
var botonesAgregar = document.getElementsByClassName('agregar-carrito');
    for (var i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].addEventListener('click', agregarProducto);
    }

// Vaciar Carrito
document.getElementById('vaciar-carrito').addEventListener('click', function () {
    sessionStorage.removeItem('carrito');
    cargarCarrito();
});

document.getElementById("vaciar-carrito").addEventListener("click", function () {
    sessionStorage.clear();
});

document.getElementById('actualizar-carrito').addEventListener('click', function() {
    cargarCarrito();
    console.log("CargarCarrito OK");
    
});

document.getElementById('logon').addEventListener('click', function() {
    console.log('Seteo usuario');
    let usuario = prompt("Ingrese su nombre: ");
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    
    
});