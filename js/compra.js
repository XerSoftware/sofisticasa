document.addEventListener("DOMContentLoaded", function () {
    loadDetail();
    
    const botonEnviar = document.getElementById('botonEnviar');
       
    if (botonEnviar) {
        botonEnviar.addEventListener('click', enviarFormulario);
    } else {
        console.warn("ADVERTENCIA: No se encontró el botón con ID 'botonEnviar'.");
    }

}); 

    function addProd (event) {
        id = event.target.getAttribute('data-id');
        const products = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].cantidad += 1
            }
            
        }
        localStorage.removeItem('carrito');
        localStorage.setItem('carrito', JSON.stringify(products));
        loadDetail();
    }
    
    function remProd (event) {
        id = event.target.getAttribute('data-id');
        
        const products = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let i = 0; i < products.length; i++) {
                if (products[i].id == id && products[i].cantidad != 0) {
                    products[i].cantidad -= 1
                    localStorage.removeItem('carrito');
                    localStorage.setItem('carrito', JSON.stringify(products));
                    loadDetail();
                }
        }

    // TODO: Cuando el contador llega a cero, eliminar el producto
    }

    

    function quitarProducto(event) {
    let producto_a_eliminar = {
        id: event.target.getAttribute('data-id'),
    };
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== producto_a_eliminar.id);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    loadDetail();
    }
    
    function carritoTotal() {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;
        let totalProductos = 0;
        for (var i = 0; i < carrito.length; i++) {
            let producto = carrito[i];
            totalProductos += parseInt(producto.cantidad);

            // Sumar el precio al total (convertimos a número)
            total += parseFloat(producto.precio) * parseInt(producto.cantidad) || 0;
        }

        localStorage.setItem('total', JSON.stringify(total));

        // Guarda la cantidad de productos
        localStorage.setItem('totalProductos', JSON.stringify(totalProductos));
    }

    function loadDetail() {
        const productos = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoTotal();
        const total = localStorage.getItem('total') || 0;
        const totalNumerico = parseFloat(total) || 0;
        const totalFormateado = totalNumerico.toFixed(2);

        const resumenDiv = document.getElementById("detalle");

        let resumenTextoHTML = `<div class="p-5"><h1>Resumen de tu Compra:</h1><br></div>`;

        console.log("Se encontraron " + productos.length);

        for (let i = 0; i < productos.length; i++) {
            const productoActual = productos[i]; 
            resumenTextoHTML += `
                <div class="row py-1">
                <div class="col-5">
                    <h3>${productoActual.nombre}</h3>
                </div>
                <div class="col-4 row p-0 m-0">
                    <div class="col-4 text-end"><button class="btn btn-secondary rounder-pill rem-prod" data-id="${productoActual.id}" style="width:2rem">-</button></div>
                    <div class="col-4 text-center m-0"><h3>${productoActual.cantidad}</h3></div>
                    <div class="col-4 text-start"><button class="btn btn-secondary rounder-pill add-prod" data-id="${productoActual.id}" style="width:2rem">+</button></div>
                </div>
                <div class="col-2 text-end"><h3>Total $${parseFloat(productoActual.precio).toFixed(2) * productoActual.cantidad}</h3></div>
                <div class="col-1"><button class="btn btn-danger rounder-pill remover" data-id="${productoActual.id}" style="width:2rem">X</button></div>
                </div>
                `;
        }
    
    resumenTextoHTML += `<hr><h2 class="text-end m-3">Total a pagar:    <strong>$${totalFormateado}</strong></h2>`;
    resumenDiv.innerHTML = resumenTextoHTML;
    

    const addProdButtons = document.getElementsByClassName('add-prod');
    const remProdButtons = document.getElementsByClassName('rem-prod');
    const quitarProdButtons = document.getElementsByClassName('remover');

     for (var i = 0; i < addProdButtons.length; i++) {
        addProdButtons[i].addEventListener('click', addProd);
    }

    for (var i = 0; i < remProdButtons.length; i++) {
        remProdButtons[i].addEventListener('click', remProd);
    }

     for (var i = 0; i < quitarProdButtons.length; i++) {
        quitarProdButtons[i].addEventListener('click', quitarProducto);
    }

    }

    function enviarFormulario(event) {
        event.preventDefault();

        const nombreContacto = document.getElementById('nombre').value.trim();
        const emailContacto = document.getElementById('contactoEmail').value.trim();
        const telefonoContacto = document.getElementById('telefono').value.trim();

        if (!nombreContacto || !emailContacto || !telefonoContacto) {
            alert("Por favor, completa todos los campos de contacto antes de enviar.");
            return; // Detenemos la función si falta algún campo.
        }
        const productos = JSON.parse(localStorage.getItem('carrito')) || [];
        let detallesCarritoParaEnvio = '';
        for (let i = 0; i < productos.length; i++) {
            const productoActual = productos[i];
            detallesCarritoParaEnvio += `${productoActual.nombre} - $${parseFloat(productoActual.precio).toFixed(2)}\n`;
        }
        
        const total = localStorage.getItem('total') || 0;
        const totalNumerico = parseFloat(total) || 0;
        const totalFormateado = totalNumerico.toFixed(2);
        document.getElementById('carritoData').value = detallesCarritoParaEnvio;
        document.getElementById('totalCarrito').value = `$${totalFormateado}`;
        document.getElementById('formulario').submit();
        
        localStorage.removeItem('carrito');
        loadDetail();

    }