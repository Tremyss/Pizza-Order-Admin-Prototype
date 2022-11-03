console.log("script.js is loaded");

let modalInputId = document.getElementById("modalInputId")
let modalInputName = document.getElementById("modalInputName")
let modalInputIngredientes = document.getElementById("modalInputIngredients")
let modalInputPrice = document.getElementById("modalInputPrice")
let modalSaveBtn = document.getElementById("modal-save")
let modalForm = document.getElementById("modal-form")


//GET data
const getData = async () => {
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

getData();

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

  
  getData();
};

const editPizza = (data) => async (event) => {
    
    modalInputId.innerText = data.id
    modalInputName.value = data.name
    modalInputIngredientes.value = data.ingredients
    modalInputPrice.value= data.price

};


const modifyData = async (event) => {

    event.preventDefault()
    const formData = new FormData(modalForm)

    const url = "http://127.0.0.1:5050/admin";
    const response = await fetch(url, {
      method: "PUT",
      body: formData
    });

    getData();
    
  };

  modalForm.addEventListener("submit", modifyData)