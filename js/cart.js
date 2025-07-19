document.addEventListener('DOMContentLoaded', function(){
    inicializar();
    cargarCarrito();
});

function actualizarCarrito() {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}); */

function quitarProducto(event) {
    let producto_a_eliminar = {
        id: event.target.getAttribute('data-id'),
    };
    console.log('Eliminar ' + producto_a_eliminar.id);
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== producto_a_eliminar.id);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    
    cargarCarrito();
}

function agregarProducto(event) {
    let producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio'),
        cantidad: 1,
        //total: event.target.getAttribute('data-precio')
    };

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let match = false;
    for (let i = 0; i < carrito.length; i++) {
        // console.log("comparar" + carrito[i].id + " y " + producto.id );
        if (carrito[i].id === producto.id) {
            // console.log("suma uno");
            carrito[i].cantidad += 1;
            carrito[i].precio = parseFloat(carrito[i].precio);
            //carrito[i].total = parseFloat(carrito[i].cantidad) * parseFloat(producto.precio);
            match = true;
        };
    }
    if (match == false) {
        carrito.push(producto);    
    };
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalCarrito = document.getElementById('total-carrito');
    let totalProductos = document.getElementById('total-productos');
    listaCarrito.innerHTML = '';
    totalCarrito.textContent = '0';

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let preciototal = 0;
    let sumaProductos = 0;
    let total = 0;
    for (var i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        preciototal = producto.cantidad * producto.precio
        let li = document.createElement('li');
        //li.textContent = producto.nombre + ' - $' + preciototal + '  (' + producto.cantidad + ') ';
        li.classList.add('row');
        
        // Descripción del producto
        let desc = document.createElement('a');
        desc.classList.add('col-10');
        desc.textContent = producto.nombre + ' - $' + preciototal + '  (' + producto.cantidad + ') ';
        
        // Botón Eliminar
        let btn_eliminar = document.createElement('a');
        btn_eliminar.classList.add('btn', 'btn-danger', 'p-1', 'mb-1', 'col-2', 'eliminar');
        btn_eliminar.dataset.id = producto.id;
        btn_eliminar.textContent = "X";
        btn_eliminar.addEventListener('click', quitarProducto);
        
        li.appendChild(desc);
        li.appendChild(btn_eliminar);
        listaCarrito.appendChild(li);
        sumaProductos += parseInt(producto.cantidad);

        // Sumar el precio al total (convertimos a número)
        total += parseFloat(preciototal) || 0;
    }

    // Guarda la cantidad de productos
    localStorage.setItem('totalProductos', JSON.stringify(sumaProductos));
    totalProductos.textContent = sumaProductos;

    localStorage.setItem('total', JSON.stringify(total));
    // Mostrar el total redondeado a 2 decimales
    totalCarrito.textContent = total.toFixed(2);
}

function inicializar() {

    // Agregar producto al carrito
    var botonesAgregar = document.getElementsByClassName('agregar-carrito');
        for (var i = 0; i < botonesAgregar.length; i++) {
            botonesAgregar[i].addEventListener('click', agregarProducto);
            console.log('Agregar Botón Agregar');
        }

    // // Eliminar producto del carrito
    // var botonesEliminar = document.getElementsByClassName('eliminar');
    //     for (var i = 0; i < botonesEliminar.length; i++) {
    //         botonesEliminar[i].addEventListener('click', quitarProducto);
    //         console.log('Agregar Botón Eliminar');
    //     }

    // Vaciar Carrito
    document.getElementById('vaciar-carrito').addEventListener('click', function () {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    document.getElementById('vaciar-carrito').addEventListener("click", function () {
        localStorage.clear();
    });

    // document.getElementById('actualizar-carrito').addEventListener('click', function() {
    //     cargarCarrito();
    //     console.log("CargarCarrito OK");
        
    // });

    // document.getElementById('logon').addEventListener('click', function() {
    //     console.log('Seteo usuario');
    //     let usuario = prompt("Ingrese su nombre: ");
    //     localStorage.setItem("usuario", JSON.stringify(usuario));
    // });
}