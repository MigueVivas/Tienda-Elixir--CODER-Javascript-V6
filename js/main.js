console.log("Bienvenid@ a Elixir")

let users = []

function ageCalculate(birth) {
    const today = new Date();
    const [day, month, year] = birth.split('/').map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year > today.getFullYear()) {
        return null;
    }
    const birthdate = new Date(year, month -1, day);
    let age = today.getFullYear() - birthdate.getFullYear();
    const actualMonth = today.getMonth() - birthdate.getMonth();
    if (actualMonth < 0 || (actualMonth === 0 && today.getDate() < birthdate.getDate())){
        age--;
    }
    return age;
}

function addUser() {
    let email = prompt("Ingrese su correo electrónico");
    let name;
    do {
        name = prompt("Ingresá tu nombre").trim()
        if (!name) {
            alert("Nombre invalido. Por favor, ingresá un nombre valido");
        }
    } while (!name);

    let lastName;
    do {
        lastName = prompt("Ingresá tu apellido").trim();
        if (!lastName) {
            alert("Apellido invalido. Por favor, ingresá un apellido valido");
        } 
    } while (!lastName);
    let birth;
    let age;
    do {
        birth = prompt ("Ingresá tu fecha de nacimiento (dd/mm/aaaa)");
        age = ageCalculate(birth);
        if (age === null) {
            alert("Por favor, ingresá una fecha válida en el formato dd/mm/aaaa");
        }    
    } while (age === null);
    

    let newUser = {
        email: email,
        name: name,
        lastName: lastName,
        birth: birth,
        age: age
    };

    users.push(newUser);
    console.log("Usuario agregado con exito:", newUser);
    return newUser
    
}


let drinks = [
    { 
        img: "../img/havanaespecial",
        drinkType: "Ron",
        drinkName: "Havana Club",
        price: 10000,
        isAlcoholic: true
    },
    {
        img: "../img/havana7anios",
        drinkType: "Ron",
        drinkName: "Havana 7 años",
        price: 13000,
        isAlcoholic: true
    },
    {
        img: "../img/havana15anios",
        drinkType: "Ron",
        drinkName: "Havana 15 años",
        price: 18000,
        isAlcoholic: true
    },
    {
        img: "../img/havanaseleccion",
        drinkType: "Ron",
        drinkName: "Havana Seleccion de Maestros",
        price: 25000,
        isAlcoholic: true
    },
    {
        img: "agua",
        drinkType: "Agua",
        drinkName: "Agua sin gas",
        price: 1000,
        isAlcoholic: false
    },
    {
        img: "gaseosa",
        drinkType: "Gaseosas",
        drinkName: "Coca Cola",
        price: 3500,
        isAlcoholic: false
    },
    {
        img: "jugo",
        drinkType: "Jugos",
        drinkName: "Jugo de Naranja",
        price: 2500,
        isAlcoholic: false
    },
]

function showMenu(filter = null) {
    let menu = "Menú de bebidas: \n";
    let filteredDrinks = drinks;
    if (filter !== null) {
        filteredDrinks = drinks.filter(drink => drink.isAlcoholic === filter);
    }
    filteredDrinks.forEach((drink, index) => {
        menu += `${index + 1}. ${drink.drinkName} (${drink.drinkType}) - Precio: $${drink.price}\n`;
    });
    menu += "0. Finalizar compra\n";
    return { menu, filteredDrinks};
}

function startPurchase(user) {
    let total = 0;
    let selectedItems = [];
    let hasAlcoholicDrinks = false;

    let filterChoice = prompt("¿Que tipo de bebidas deseas ver?\n1. Bebidas alcohólicas\n2. Bebidas no alcohólicas\n3. Todas las bebidas");
    let filter = null;
    
    if (filterChoice == "1") {
        if (user.age < 18) {
            alert("Lo siento, debes tener al menos 18 años para comprar bebidas alcohólicas");
            return;
        }
        filter = true;
        } else if (filterChoice == "2") {
            filter = false;
        }

        while (true) {
            let { menu, filteredDrinks } = showMenu(filter);
            let choice = parseInt(prompt(menu));

            if (choice === 0) {
                break;
            } else if (choice > 0 && choice <= filteredDrinks.length) {
                let selectedDrink = filteredDrinks [choice - 1];
                selectedItems.push(selectedDrink);
                total += selectedDrink.price;

                if (selectedDrink.isAlcoholic) {
                    hasAlcoholicDrinks = true;
                }
                alert(`Has añadido: ${selectedDrink.drinkName}. Total actual: $${total}`);
            } else {
                alert("No has seleccionado ningún producto.");
            }
        }
        if (selectedItems.length > 0) {
            let purchaseSummary = "Tu compra es:\n";
            selectedItems.forEach(item => {
                purchaseSummary += `- ${item.drinkName} : $${item.price}\n`;
            });
            purchaseSummary += `Total: $${total}`;
            alert(purchaseSummary);
        } else {
            alert("No has seleccionado ningún producto");
        }
}

let user = addUser();
startPurchase(user);