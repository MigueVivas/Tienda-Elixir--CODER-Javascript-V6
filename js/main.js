let currentUser = null;
let users = [];
let carrito = [];
let totalCarrito

function cargarDatosDesdeLocalStorage() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
        currentUser = usuarioGuardado;
        document.getElementById('mensaje').innerText = `Bienvenido de nuevo, ${currentUser.name}!`;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        totalCarrito = calcularTotalCarrito();
        renderizarCarrito();
    }
}

cargarDatosDesdeLocalStorage();

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function ageCalculate(birthDate) {
    const [day, month, year] = birthDate.split('/');
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return isNaN(age) ? null : age;
}

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const birth = document.getElementById('birth').value.trim();

    if (!name || !lastName || !validarEmail(email)) {
        alert("Por favor, llena los campos correctamente.");
        return;
    }
    const age = ageCalculate(birth);
    if (age === null) {
        alert("Por favor, ingresá una fecha válida en el formato dd/mm/aaaa.");
        return;
    }

    const newUser = { name, lastName, email, birth, age };
    users.push(newUser);
    currentUser = newUser;

    localStorage.setItem('usuario', JSON.stringify(newUser));

    document.getElementById('mensaje').innerText = `Usuario registrado con éxito: ${newUser.name} ${newUser.lastName}, ${newUser.age} años.`;
    document.getElementById('registroForm').style.display = 'none';
    document.getElementById('productos').style.display = 'block';

    renderizarProductos();
});

function renderizarProductos() {
    const contenedorBebidas = document.getElementById('drinks');
    contenedorBebidas.classList.add('drinks-container');
    contenedorBebidas.innerHTML = '';

    drinks.forEach(bebida => {
        const divBebida = document.createElement('div');
        divBebida.classList.add('producto');
        divBebida.innerHTML = `
            <img src="${bebida.img}" alt="${bebida.drinkName}">
            <h3>${bebida.drinkName}</h3>
            <p>Precio: $${bebida.price}</p>
            <button class="agregar-carrito" data-id="${bebida.id}">Agregar al carrito</button>
        `;
        contenedorBebidas.appendChild(divBebida);
    });
}

function renderizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    carrito.forEach((producto, index) => {
        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add('producto-carrito');
        productoCarrito.innerHTML = `
            <span>${producto.drinkName} - $${producto.price}</span>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        carritoDiv.appendChild(productoCarrito);
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<strong>Total: $${totalCarrito}</strong>`;
    carritoDiv.appendChild(totalDiv);

    const finalizarButton = document.getElementById('finalizarCompra');
      if (carrito.length > 0) {
          finalizarButton.style.display = 'block';
      } else {
          finalizarButton.style.display = 'none';
      }
}

function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.price, 0);
}

document.getElementById('drinks').addEventListener('click', function(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        if (!currentUser) {
            alert("Debes registrarte antes de agregar productos al carrito.");
            document.getElementById('registroForm').style.display = 'block';
            return;
        }

        const bebidaId = e.target.getAttribute('data-id');
        const bebidaSeleccionada = drinks.find(prod => prod.id == bebidaId);
        
        carrito.push(bebidaSeleccionada);
        totalCarrito = calcularTotalCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }
});

document.getElementById('carrito').addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        totalCarrito = calcularTotalCarrito(); 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }
});

document.getElementById('finalizarCompra').addEventListener('click', function() {
    alert("Gracias por su compra!");

    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');

    currentUser = null;
    carrito = [];
    totalCarrito = 0;

    document.getElementById('mensaje').innerText = '';
    document.getElementById('registroForm').style.display = 'block';
    document.getElementById('productos').style.display = 'none';
    document.getElementById('drinks').innerHTML = '';
    document.getElementById('carrito').innerHTML = '';
});

let drinks = [
    { 
        id: 1,
        img: "./img/havanaespecial.png",
        drinkType: "Ron", 
        drinkName: "Havana Club",
        price: 10000,
        isAlcoholic: true
    },
    { 
        id: 2,
        img: "./img/havana7anios.png",
        drinkType: "Ron",
        drinkName: "Havana 7 años",
        price: 13000,
        isAlcoholic: true
    },
    {
        id: 3,
        img: "./img/havana15anios.png",
        drinkType: "Ron",
        drinkName: "Havana 15 años",
        price: 18000,
        isAlcoholic: true
    },
    {
        id: 4,
        img: "./img/havanaseleccion.png",
        drinkType: "Ron",
        drinkName: "Havana Selección de Maestros",
        price: 25000,
        isAlcoholic: true
    },
    {
        id: 5,
        img: "agua",
        drinkType: "Agua",
        drinkName: "Agua sin gas",
        price: 1000,
        isAlcoholic: false
    },
    { 
        id: 6,
        img: "gaseosa",
        drinkType: "Gaseosas",
        drinkName: "Coca Cola",
        price: 3500,
        isAlcoholic: false
    },
    { 
        id: 7,
        img: "jugo",
        drinkType: "Jugos",
        drinkName: "Jugo de Naranja",
        price: 2500,
        isAlcoholic: false
    },
];

