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
        const products = JSON.parse(sessionStorage.getItem('carrito')) || [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].cantidad += 1
            }
            
        }
        sessionStorage.removeItem('carrito');
        sessionStorage.setItem('carrito', JSON.stringify(products));
        loadDetail();
    }
    
    function remProd (event) {
        id = event.target.getAttribute('data-id');
        
        const products = JSON.parse(sessionStorage.getItem('carrito')) || [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].cantidad -= 1
            }
            
        }
        sessionStorage.removeItem('carrito');
        sessionStorage.setItem('carrito', JSON.stringify(products));
        loadDetail();

    }
    
    function loadDetail() {
        const productos = JSON.parse(sessionStorage.getItem('carrito')) || [];
        const total = sessionStorage.getItem('total') || 0;
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
                    ${productoActual.nombre}
                </div>
                <div class="col-4 row p-0 m-0">
                    <div class="col-4 text-end"><button class="btn btn-secondary rounder-pill rem-prod" data-id="${productoActual.id}" style="width:2rem">-</button></div>
                    <div class="col-4 text-center m-0">${productoActual.cantidad}</div>
                    <div class="col-4 text-start"><button class="btn btn-secondary rounder-pill add-prod" data-id="${productoActual.id}" style="width:2rem">+</button></div>
                </div>
                <div class="col-3 text-end">Total $${parseFloat(productoActual.precio).toFixed(2)}</div>
                </div>
                `;
        }
    
    resumenTextoHTML += `<hr><h3 class="text-end">Total a pagar:    <strong>$${totalFormateado}</strong></h3>`;
    resumenDiv.innerHTML = resumenTextoHTML;
    

    const addProdButtons = document.getElementsByClassName('add-prod');
    const remProdButtons = document.getElementsByClassName('rem-prod');

     for (var i = 0; i < addProdButtons.length; i++) {
        addProdButtons[i].addEventListener('click', addProd);
    }

    for (var i = 0; i < remProdButtons.length; i++) {
        remProdButtons[i].addEventListener('click', remProd);
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

        let detallesCarritoParaEnvio = '';
        for (let i = 0; i < productos.length; i++) {
            const productoActual = productos[i];
            detallesCarritoParaEnvio += `${productoActual.nombre} - $${parseFloat(productoActual.precio).toFixed(2)}\n`;
        }

        document.getElementById('carritoData').value = detallesCarritoParaEnvio;
        document.getElementById('totalCarrito').value = `$${totalFormateado}`;
        document.getElementById('formulario').submit();
    }