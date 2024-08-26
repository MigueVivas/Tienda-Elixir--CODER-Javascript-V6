console.log("Bienvenid@ a Elixir")

let nombre;

do {
    nombre= prompt("Ingresá tu nombre").trim()
    if (!nombre) {
        alert("Nombre invalido. Por favor, ingresá un nombre valido");
    }
} while (!nombre);

let apellido;

do {
    apellido = prompt("Ingresá tu apellido").trim();
    if (!apellido) {
        alert("Apellido invalido. Por favor, ingresá un apellido valido");
    } 
} while (!apellido);

let nombreCompleto = nombre.toUpperCase() + " " + apellido.toUpperCase()

console.log("Hola " + nombreCompleto + " aca vendemos bebidas")

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const [dia, mes, anio] = fechaNacimiento.split('/').map(Number);
    if (isNaN(dia) || isNaN(mes) || isNaN(anio) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio > hoy.getFullYear()) {
        return null;
    }
    const fechaNac = new Date(anio, mes -1, dia);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth() - fechaNac.getMonth();
    if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < fechaNac.getDate())){
        edad--;
    }
    return edad;
}

let fechaNacimiento;
let edad;

do {
    fechaNacimiento = prompt ("Ingresá tu fecha de nacimiento (dd/mm/aaaa)");
    edad = calcularEdad(fechaNacimiento);
    if (edad === null) {
        alert("Por favor, ingresá una fecha válida en el formato dd/mm/aaaa");
    }    
} while (edad === null);

if (edad > 18) {
    console.log("Excelente, eres mayor de edad, puedes comprar bebidas alcoholicas")
} else{
    console.log("Uhh! no eres mayor de edad, no podes comprar bebidas alcoholicas")
}
