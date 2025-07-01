let fechaNacimiento = prompt("Ingrese fecha Nacimiento:");
let $fechaNacimiento = parseInt(fechaNacimiento);
let condicion = false;
do {
    if (isNaN($fechaNacimiento) == false) {
    let edad = (2025 - $fechaNacimiento);
    console.log(edad);
    let condicion = true;
    } else {
            console.log("Error!!! ingrese un número");
    }
}
while (condicion)
