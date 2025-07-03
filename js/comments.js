document.addEventListener('DOMContentLoaded', function() {
    iniciar();
})

async function iniciar() {
    const datos = await loadComments();
    const titleForAdd = "Reseñas"
    const elementTarget = "container-comments"
    render_comments(elementTarget, titleForAdd, datos)
}

async function loadComments () {
    try {
        const respuesta = await fetch('https://dummyjson.com/comments');
        const datos = await respuesta.json(); // convierte la respuesta en JSON
        console.log(datos); // los ves en consola
        return datos.comments; // devolvés los datos si querés usarlos afuera
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
    

   
}

async function render_comments(elementTarget, title, commentLists) {

// Obtengo el contenedor donde quiero agregar la lista
    const comments = document.getElementById(elementTarget);

    // Agrego título y decoración
    let barAbove = document.createElement("hr");
    let barUnder = document.createElement("hr");
    let addTitle = document.createElement("h1");
    comments.append(barAbove);
    addTitle.textContent = title;
    comments.appendChild(addTitle);
    comments.append(barUnder);

    // Recorro la lista de producto y agregue tarjeta del producto
    commentLists.forEach(item => {
        comments.innerHTML += `
            <div class="col-md-4 d-flex justify-content-center">    
                    <div class="card" style="width: 48rem;">
                    <div class="card-body card_product">
                        <h5 class="card-title">${item.user.fullName}</h5>
                        <p class="card-text">${item.body}</p>
                    </div>
                </div>
            </div>
        `;
    });

    return true;
};