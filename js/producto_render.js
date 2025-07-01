// Función para renderizar listado de producto
function render(elementTarget, title, productList) {
    // Obtengo el contenedor donde quiero agregar la lista
    const productos = document.getElementById(elementTarget);

    // Agrego título y decoración
    let barAbove = document.createElement("hr");
    let barUnder = document.createElement("hr");
    let addTitle = document.createElement("h1");
    productos.append(barAbove);
    addTitle.textContent = title;
    productos.appendChild(addTitle);
    productos.append(barUnder);

    // Recorro la lista de producto y agregue tarjeta del producto
    productList.forEach(item => {
        productos.innerHTML += `
            <div class="col-md-4 d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img src=${item.imgSrc} class="card-img-top">
                    <div class="card-body card_product">
                        <h5 class="card-title">${item.titleOfProduct}</h5>
                        <p class="card-text">${item.description}</p>
                        <h5 class="card-title">Precio $${item.price}</h5>
                        <a href="#" class="btn btn-secondary agregar-carrito" 
                            data-id="${item.Id}"
                            data-nombre="${item.titleOfProduct}"
                            data-precio="${item.price}">Agregar al Carrito</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    return true;
};

const listForAdd = [
    {Id: 1, price: 100,  imgSrc: "./imagenes/productos/ceramica/taza01.jpg", titleOfProduct: "Taza Aztec", description: "Taza de la línea Aztec 300ml."},
    {Id: 2, price: 150, imgSrc: "./imagenes/productos/ceramica/taza02.jpg", titleOfProduct: "Taza Optic",description: "Taza de la línea Optic 300ml."},
    {Id: 3, price: 180, imgSrc: "./imagenes/productos/ceramica/taza03.jpg", titleOfProduct: "Taza Organic",description: "Taza de la línea Organic 300ml."},
    ];

titleForAdd = "Productos nuevos"

elementTarget = "listado"

render(elementTarget, titleForAdd, listForAdd)