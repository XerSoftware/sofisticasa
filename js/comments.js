document.addEventListener('DOMContentLoaded', function() {
    iniciar();
})

async function iniciar() {
    const commentsData = await loadComments();
    const commentsCount = commentsData.length
    const userData = await loadUsers(commentsCount);
    const titleForAdd = "Reseñas"
    const elementTarget = "container-comments"
    //render_comments(elementTarget, titleForAdd, datos)
    render_comments_carousel('container-carousel', commentsData, userData);
}

async function loadComments () {
    try {
        const response = await fetch('https://dummyjson.com/comments');
        const data = await response.json(); // convierte la respuesta en JSON
        //console.log(data); // los ves en consola
        return data.comments;
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
}

async function loadUsers (commentCount) {
    try {
        const response = await fetch('https://randomuser.me/api/?results='+commentCount);
        const data = await response.json();
        //console.log('Lista de Usuarios:', data);
        return data.results;
    }
    catch (error){
        console.error('Error al obtener Usuarios', error);
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
}

async function render_comments_carousel(elementTarget, commentLists, userLists) {
    const carousel = document.getElementById(elementTarget);
    const indicators = document.getElementById("indicator");
    let indicator = 0;
    console.log(userLists);
    commentLists.forEach(item => {
        indicators.innerHTML += `
           <button type="button" data-bs-target="#demo" data-bs-slide-to=${indicator}></button>
        `;
        indicator += 1;
        itemUser = userLists[indicator];
        console.log(itemUser);
        carousel.innerHTML += `
        <div class="carousel-item col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src="${itemUser.picture.large}" width="150px" class="card-img-top">
                    <div class="card-body card_product">
                        <h5 class="card-title">${item.user.fullName}</h5>
                        <p class="card-text">${item.body}</p>
                    </div>
                </div>
        </div>
        `;
        //         <div class="carousel-item">    
        // <img src="./imagenes/productos/ceramica/taza01.jpg" alt="Los Angeles" class="d-block" style="width:100%">
        // <h5>${item.user.fullName}</h5>
        //     <p>${item.body}</p>
        // </div>
    });

    return true;
}