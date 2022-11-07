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

  let orderContainer = document.getElementById("orderContainer");
  orderContainer.innerHTML = "";

  //ebből pizzánként renderelni többet

  for (let i = 0; i < datas.length; i++) {
   let order =  document.createElement("div")
   order.setAttribute("class","order")
   let pizzaProperty =  document.createElement("div")
   pizzaProperty.setAttribute("class","pizzaProperty")
    let sum =0;
    for (const data in datas[i]) {
      if (typeof datas[i][data] === "object") {
        let indiPizza =  document.createElement("div")
        indiPizza.setAttribute("class","indiPizza")
        for (const subData in datas[i][data]) {
          if (subData === "amount") {
            let amount = document.createElement("div")
            amount.setAttribute("class","amount")
            amount.innerText = datas[i][data][subData]
            indiPizza.appendChild(amount)
          }
          if (subData === "name") {
            let name = document.createElement("div")
            name.setAttribute("class","name")
            name.innerText = datas[i][data][subData]
            indiPizza.appendChild(name)
          }
          if (subData === "ingredients") {
            let ingredients = document.createElement("div")
            ingredients.setAttribute("class","ingredients")
            ingredients.innerText = datas[i][data][subData]
            indiPizza.appendChild(ingredients)
          }
  
        }
        pizzaProperty.appendChild(indiPizza)
        order.appendChild(pizzaProperty)
      }
    }
    orderContainer.appendChild(order)
    let customerProperty = document.createElement("div")
    customerProperty.setAttribute("class","customerProperty")
    let customer = document.createElement("div")
    customer.innerText=""+datas[i].name+" "+datas[i].city+" "+datas[i].houseNumber+" "+datas[i].street+" "+datas[i].zipCode+" "
    customerProperty.appendChild(customer)
    order.appendChild(customerProperty)
    let price = document.createElement("div")
    price.setAttribute("class","priceProperty")
    let sumPrice = document.createElement("div")
    sumPrice.setAttribute("class","sum-price")
    sumPrice.innerText= datas[i].sumPrice
    price.appendChild(sumPrice)
    order.appendChild(price)

    let currentStatus = document.createElement("div")
    currentStatus.setAttribute("class","currentStatus")
    currentStatus.innerText ="Progress: "+datas[i].progress
    order.appendChild(currentStatus)

    let progressSelect = document.createElement("select")
    progressSelect.setAttribute("class","progressSelect")
    progressSelect.setAttribute("value","proba")

    progressSelect.addEventListener("change",updateProgress(datas[i]))
    let progressOption0 = document.createElement("option")
    progressOption0.setAttribute("value","Módosítás")
    progressOption0.innerText= "Módosítás"
    let progressOption1 =  document.createElement("option")
    progressOption1.setAttribute("value","Open")
    progressOption1.innerText= "Open"
    let progressOption2 =  document.createElement("option")
    progressOption2.setAttribute("value","Closed")
    progressOption2.innerText="Closed"
    progressSelect.appendChild(progressOption0)
    progressSelect.appendChild(progressOption1)
    progressSelect.appendChild(progressOption2)
    order.appendChild(progressSelect)
  }
};

const updateProgress = (data) => async(event) =>{
  console.log("lefut a change event")
    const idSearch = data.id;
    const progressValue = event.target.value;
    const dataObject ={
      id: idSearch,
      progressValue:progressValue
    }
    await fetch("http://127.0.0.1:5050/order",{
      method:"POST",
      headers:{  
        "Content-Type": "application/json"
         },
      body:JSON.stringify(dataObject)
    })
    getOrdersData();
}
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
