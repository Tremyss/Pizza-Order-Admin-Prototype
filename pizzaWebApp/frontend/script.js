console.log("script.js loaded");
let mainDiv = document.getElementById("pizzas");
let orderDiv = document.getElementById("order-div");
let basketListDiv = document.getElementById("cart-list")
let priceSpan = document.querySelector("span")
let userInstructions = document.getElementById("user-instructions")
let formDiv = document.getElementById("form");
let nullOrder = document.getElementById("null-order");
userInstructions.innerText = "Kérjük, add meg az adataidat, majd kattints a Rendelés gombra!"

let actualOrder = [];
let pizzaObj;
let pizzaArray;
let inputValue;
let pizzaTitle;



let getData = async () => {
  const response = await fetch("http://localhost:8080/api");
  const myData = await response.json();
  pizzaArray = myData;

  for (const pizza of myData) {

    let pizzaDiv = document.createElement("div");
    pizzaDiv.setAttribute("id", `${pizza.id}-div`);
    pizzaDiv.setAttribute("class", "pizza-card animate__animated animate__zoomIn");
    

    let pizzaImg = document.createElement("img");
    pizzaImg.setAttribute("src", pizza.image);
    pizzaDiv.appendChild(pizzaImg);

    let pizzaContent = document.createElement("div");
    pizzaContent.setAttribute("class", "pizza-content");
    pizzaDiv.appendChild(pizzaContent);

    let pizzaName = document.createElement("h2");
    pizzaName.innerText = pizza.name;
    pizzaContent.appendChild(pizzaName);

    let pizzaIngr = document.createElement("p");
    pizzaIngr.innerText = pizza.ingredients;
    pizzaContent.appendChild(pizzaIngr);

    let pizzaPrice = document.createElement("h4");
    pizzaPrice.innerText = `${pizza.price} Ft`;
    pizzaContent.appendChild(pizzaPrice);

    let pizzaInput = document.createElement("input");
    pizzaInput.setAttribute("type", "number");
    pizzaInput.setAttribute("id", `${pizza.id}-input`);
    pizzaInput.defaultValue = 1;
    pizzaContent.appendChild(pizzaInput);

    let orderButton = document.createElement("button");
    orderButton.innerText = "Kosárhoz ad";
    orderButton.setAttribute("id", `${pizza.id}-btn`);
    pizzaContent.appendChild(orderButton);
    orderButton.addEventListener("click", addToChart);

    mainDiv.appendChild(pizzaDiv);
  }
};
getData();


const generateBasket = () => {
  let sumPrice = 0
  basketListDiv.innerHTML = ""
  for (const elem of actualOrder) {
    let basketLineDiv = document.createElement("div")
    basketLineDiv.setAttribute("class", "cart-line")
    
    let pizzaAmountDiv = document.createElement("div")
    pizzaAmountDiv.setAttribute("class","pizza-amount")
    pizzaAmountDiv.innerText = `${elem.amount} db`
    basketLineDiv.appendChild(pizzaAmountDiv)

    let pizzaNameDiv = document.createElement("div")
    pizzaNameDiv.setAttribute("class","pizza-name")
    pizzaNameDiv.innerText = elem.name
    basketLineDiv.appendChild(pizzaNameDiv)

    let pizzaPriceDiv = document.createElement("div")
    pizzaPriceDiv.setAttribute("class","pizza-price")
    pizzaPriceDiv.innerText = `${elem.price * elem.amount} Ft`
    basketLineDiv.appendChild(pizzaPriceDiv)

    let deleteIcon = document.createElement("i")
    deleteIcon.setAttribute("class","fa fa-trash-o")
    deleteIcon.addEventListener("click",deleteOrderPizza)
    basketLineDiv.appendChild(deleteIcon)

    basketListDiv.appendChild(basketLineDiv)

    sumPrice += elem.amount * elem.price
  }
  priceSpan.innerHTML = `${sumPrice} Ft`
}

const deleteOrderPizza = (event)=>{
  pizzaTitle = event.target.parentElement.children[1].innerText;
  for(pizza of actualOrder){
    if(pizza.name ===pizzaTitle){
      actualOrder = actualOrder.filter((pizza)=>pizza.name !== pizzaTitle)
    }
  }
  if(actualOrder.length ===0){
    formDiv.style.display="none";
  }
  generateBasket();

}

const addToChart = (event) => {
  inputValue = event.target.previousSibling.value;
  pizzaTitle = event.target.parentElement.children[0].innerText;
  for (const pizza of pizzaArray) {
    if (pizzaTitle === pizza.name) {
      pizza.amount = Number(inputValue);
      pizzaObj = pizza;
    }
  }

  if (actualOrder.length === 0) {
    actualOrder.push(pizzaObj)
  } else {
    const index = actualOrder.findIndex(pizza => pizza.id === pizzaObj.id)
    if (index === -1) {
      actualOrder.push(pizzaObj)
    } else {
      actualOrder[index].amount = pizzaObj.amount
    }
  }
  
  formDiv.style.display = "flex"
  nullOrder.style.display = "none"
  generateBasket()
}

// Submit button megnyomásakor a vásárlói adatokat összeszedjük 
// egy objectbe és a rendelt pizzák adataival együtt 
// odaadjuk egy függvénynek
document.getElementById("order-div").onsubmit = function (event) {
  event.preventDefault();
  const actualCustomer = {
    name: event.target.name.value,
    zipCode: event.target.zipCode.value,
    city: event.target.city.value,
    street: event.target.street.value,
    houseNumber: event.target.houseNumber.value
  }
  const actualAllData = { ...actualCustomer, ...actualOrder }
  sendOrderData(actualAllData)
}

// Függvény, ami a rendelés összes adatát POST requesttel elküldi a szervernek
const sendOrderData = async (obj) => {
  const data = JSON.stringify(obj)
  const url = "http://localhost:8080/order"
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data
  }
  const response = await fetch(url, options)
  console.log(response)
  console.log(response.status)
  userInstructions.innerText = (response.status === 200) ? `Köszönjük a rendelést, kedves ${obj.name}!` : response.status
  userInstructions.setAttribute("class","order-confirm")
  actualOrder = []
}

var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)













