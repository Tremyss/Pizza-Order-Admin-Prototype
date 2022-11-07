console.log("script.js is loaded");

let uploadForm = document.getElementById("uploadForm");
let modalInputId = document.getElementById("modalInputId");
let modalInputName = document.getElementById("modalInputName");
let modalInputIngredientes = document.getElementById("modalInputIngredients");
let modalInputPrice = document.getElementById("modalInputPrice");
let modalSaveBtn = document.getElementById("modal-save");
let modalForm = document.getElementById("modal-form");

//GET data
const getPizzaData = async () => {
  const url = "http://127.0.0.1:5050/admin";
  const dataJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataObj = await dataJson.json();
  generateMenu(dataObj);
};

getPizzaData();

const getOrdersData = async () => {
  const url = "http://127.0.0.1:5050/order";
  const orderDataJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const orderDataObj = await orderDataJson.json();

  generateOrders(orderDataObj);
  // console.log(orderDataObj);
  /* // ? megrendelő neve:
  console.log(orderDataObj[0].name);
  // ? pizza neve:
  console.log(orderDataObj[1][0].name); */
};
getOrdersData();

const generateOrders = (datas) => {
  // orderDataObject = [
  //   { // order 1
  //     {  //pizza 1
  //       name: "name",
  //       id: "id",
  //       image: "image",
  //       ingredients: "ingredients",
  //       name: "name",
  //       price: 3000,
  //       status: "status"
  //     },
  //     { //pizza 2
  //       name: "name",
  //       id: "id",
  //       image: "image",
  //       ingredients: "ingredients",
  //       name: "name",
  //       price: 3000,
  //       status: "status"
  //     },
  //     city: "city",
  //     houseNumber: "house Number",
  //     name: "customer's name",
  //     street: "street name",
  //     zipCode: 7632
  //   },
  //     { // order 2
  //       {  //pizza 1
  //         name: "name",
  //         id: "id",
  //         image: "image",
  //         ingredients: "ingredients",
  //         name: "name",
  //         price: 3000,
  //         status: "status"
  //       },
  //       { //pizza 2
  //         name: "name",
  //         id: "id",
  //         image: "image",
  //         ingredients: "ingredients",
  //         name: "name",
  //         price: 3000,
  //         status: "status"
  //       },
  //       city: "city",
  //       houseNumber: "house Number",
  //       name: "customer's name",
  //       street: "street name",
  //       zipCode: 7632
  //     }

  //   ]

  let orderContainer = document.getElementById("orderContainer");
  orderContainer.innerHTML = "";

  for (let i = 0; i < datas.length; i++) {
    for (const data in datas[i]) {
      if (typeof datas[i][data] === "object") {
        for (const subData in datas[i][data]) {
          if (subData === "name") {
            console.log(datas[i][data][subData]);
          }
          if (subData === "ingredients") {
            console.log(datas[i][data][subData]);
          }
        }
      }
    }
  }

  /* datas.map((data) => {
    let orderDiv = document.createElement("div");
    orderDiv.setAttribute("class", "order");

    //ebből pizzánként renderelni többet
    let pizzaPropertyDiv = document.createElement("div");
    pizzaPropertyDiv.setAttribute("class", "orderProperty");

    // * ide kell majd még egy map!
    if (typeof data === "object") {
      console.log(data.name);
      
      
    }
    let orderAmountDiv = document.createElement("div");
    orderAmountDiv.setAttribute("class", "orderAmount");

    let orderNameDiv = document.createElement("div");
    orderNameDiv.setAttribute("class", "orderName");

    let orderIngredientsDiv = document.createElement("div");
    orderIngredientsDiv.setAttribute("class", "orderIngredients");
    // map

    pizzaPropertyDiv.appendChild(orderAmountDiv);
    pizzaPropertyDiv.appendChild(orderNameDiv);
    pizzaPropertyDiv.appendChild(orderIngredientsDiv);

    orderDiv.appendChild(pizzaPropertyDiv);

    let customerPropertyDiv = document.createElement("div");
    customerPropertyDiv.setAttribute("class", "customerProperty");

    let customerNameDiv = document.createElement("div");
    customerNameDiv.setAttribute("class", "customerName");
    customerNameDiv.innerText = data.name;

    let customerZipCodeDiv = document.createElement("div");
    customerZipCodeDiv.setAttribute("class", "customerZipCode");
    // * customerNameDiv.innerText = data.name;

    let customerCityDiv = document.createElement("div");
    customerCityDiv.setAttribute("class", "customerCity");

    let customerStreetDiv = document.createElement("div");
    customerStreetDiv.setAttribute("class", "customerStreet");

    let customerHouseNumberDiv = document.createElement("div");
    customerHouseNumberDiv.setAttribute("class", "customerHouseNumber");

    customerPropertyDiv.appendChild(customerNameDiv);
    customerPropertyDiv.appendChild(customerZipCodeDiv);
    customerPropertyDiv.appendChild(customerCityDiv);
    customerPropertyDiv.appendChild(customerStreetDiv);
    customerPropertyDiv.appendChild(customerHouseNumberDiv);

    orderDiv.appendChild(customerPropertyDiv);

    let customerPayDiv = document.createElement("div");
    customerPayDiv.setAttribute("class", "customerPay");

    let customerSumPrice = document.createElement("div");
    customerSumPrice.setAttribute("class", "customerSumPrice");

    let customerOrderPhaseDiv = document.createElement("div");
    customerOrderPhaseDiv.setAttribute("class", "customerOrderPhase");

    customerPayDiv.appendChild(customerSumPrice);
    customerPayDiv.appendChild(customerOrderPhaseDiv);

    orderDiv.appendChild(customerPayDiv);

    orderContainer.appendChild(orderDiv);
  }); */
};

// Generate Menu-list section
const generateMenu = (datas) => {
  let menuBody = document.getElementById("menuBody");
  menuBody.innerHTML = "";
  datas.map((data) => {
    let menuRowDiv = document.createElement("div");
    menuRowDiv.setAttribute("class", "menuRow");

    let pizzaImage = document.createElement("img");
    pizzaImage.setAttribute("class", "pizzaImage");
    pizzaImage.src = data.image;
    pizzaImage.alt = data.name;
    menuRowDiv.appendChild(pizzaImage);

    let pizzaIdDiv = document.createElement("div");
    pizzaIdDiv.setAttribute("class", "pizzaId");
    pizzaIdDiv.innerText = data.id;
    menuRowDiv.appendChild(pizzaIdDiv);

    let pizzaStatusDiv = document.createElement("div");
    pizzaStatusDiv.setAttribute("class", "pizzaStatus");
    pizzaStatusDiv.innerText = data.status;
    menuRowDiv.appendChild(pizzaStatusDiv);

    let pizzaNameDiv = document.createElement("div");
    pizzaNameDiv.setAttribute("class", "pizzaName");
    pizzaNameDiv.innerText = data.name;
    menuRowDiv.appendChild(pizzaNameDiv);

    let pizzaIngredientsDiv = document.createElement("div");
    pizzaIngredientsDiv.setAttribute("class", "pizzaIngredients");
    pizzaIngredientsDiv.innerText = data.ingredients;
    menuRowDiv.appendChild(pizzaIngredientsDiv);

    let pizzaPriceDiv = document.createElement("div");
    pizzaPriceDiv.setAttribute("class", "pizzaPrice");
    pizzaPriceDiv.innerText = data.price;
    menuRowDiv.appendChild(pizzaPriceDiv);

    let editButton = document.createElement("button");
    editButton.setAttribute("class", "editButton");
    // data-bs-toggle="modal" data-bs-target="#exampleModal"
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#exampleModal");
    editButton.innerText = "edit";
    editButton.addEventListener("click", editPizza(data));
    menuRowDiv.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", deletePizza(data));
    menuRowDiv.appendChild(deleteButton);

    menuBody.appendChild(menuRowDiv);
  });
};

// Uj pizza feltoltés serverre funkcio
const uploadData = async (event) => {
  event.preventDefault();
  const formData = new FormData(uploadForm);

  await fetch("http://127.0.0.1:5050/admin", {
    method: "POST",
    body: formData,
  });
  getPizzaData();
};

// editPizza eventlisterner function

// deletePizza eventlisterner function

const deletePizza = (data) => async (event) => {
  if (confirm(`Biztos törli a  ${data.name} tételt ?`)) {
    const deletedData = {
      id: data.id,
    };

    const url = "http://127.0.0.1:5050/admin";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedData),
    });
  }
  getPizzaData();
};

const editPizza = (data) => async (event) => {
  modalInputId.innerText = data.id;
  modalInputName.value = data.name;
  modalInputIngredientes.value = data.ingredients;
  modalInputPrice.value = data.price;
};

const modifyData = async (event) => {
  //event.preventDefault()
  const formData = new FormData(modalForm);
  console.log(modalForm);
  formData.append("image", `../images/pizza${modalInputId.innerText}.jpg`);
  /* let idNumber = modalInputId.innerText
    console.log(typeof idNumber)
    let numberifiedIdNumber = parseInt(idNumber)
    console.log(typeof numberifiedIdNumber)
    formData.append("id", numberifiedIdNumber) */
  formData.append("id", modalInputId.innerText);

  const url = "http://127.0.0.1:5050/admin";
  const response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  getPizzaData();
  console.log([...formData]);
};

uploadForm.addEventListener("submit", uploadData);
modalForm.addEventListener("submit", modifyData);
