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
            <div class="col-md-4 d-flex justify-content-center pt-4">
                <div class="card" style="width: 18rem;">
                    <img src=${item.imgSrc} class="card-img-top" alt="${item.description}">
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
    {Id: 10, price: 50,  imgSrc: "./imagenes/productos/velas/velas001.png", titleOfProduct: "Vela Night", description: "Aromas suaves y envolventes para una noche de relax."},
    {Id: 20, price: 75, imgSrc: "./imagenes/productos/velas/velas002.png", titleOfProduct: "Vela Salmón",description: "Diseño elegante y color cálido para ambientar cualquier espacio."},
    {Id: 30, price: 90, imgSrc: "./imagenes/productos/velas/velas003.png", titleOfProduct: "Vela Rustica",description: "Textura artesanal y tonos tierra para un estilo natural y cálido."},
    {Id: 50, price: 45,  imgSrc: "./imagenes/productos/velas/velas004.png", titleOfProduct: "Vela Canela", description: "Notas especiadas que evocan calidez y hogar."},
    {Id: 60, price: 70, imgSrc: "./imagenes/productos/velas/velas005.png", titleOfProduct: "Vela Rosa",description: "Toque romántico con suaves tonos rosados y aroma floral."},
    {Id: 70, price: 90, imgSrc: "./imagenes/productos/velas/velas006.png", titleOfProduct: "Vela Gota",description: "Diseño moderno en forma de gota, ideal para espacios minimalistas."},
    ];

titleForAdd = "Velas Aromáticas"

elementTarget = "listado"

render(elementTarget, titleForAdd, listForAdd)