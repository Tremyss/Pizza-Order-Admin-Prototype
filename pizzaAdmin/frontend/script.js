console.log("script.js is loaded")

//GET data
const getData = async () => {
    const url = "http://127.0.0.1:5050/admin"
    const dataJson = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const dataObj = await dataJson.json()
    generateMenu(dataObj)
}

getData()


// Generate Menu-list section
const generateMenu = (datas) => {
    let menuBody = document.getElementById("menuBody")
    datas.map((data) => {

        let menuRowDiv = document.createElement("div")
        menuRowDiv.setAttribute("class", "menuRow")
        
        let pizzaImage = document.createElement("img")
        pizzaImage.setAttribute("class", "pizzaImage")
        pizzaImage.src = data.image
        pizzaImage.alt = data.name
        menuRowDiv.appendChild(pizzaImage)
    
        let pizzaIdDiv = document.createElement("div")
        pizzaIdDiv.setAttribute("class", "pizzaId")
        pizzaIdDiv.innerText = data.id
        menuRowDiv.appendChild(pizzaIdDiv)
        
        let pizzaNameDiv = document.createElement("div")
        pizzaNameDiv.setAttribute("class", "pizzaName")
        pizzaNameDiv.innerText = data.name
        menuRowDiv.appendChild(pizzaNameDiv)
        
        let pizzaIngredientsDiv = document.createElement("div")
        pizzaIngredientsDiv.setAttribute("class", "pizzaIngredients")
        pizzaIngredientsDiv.innerText = data.ingredients
        menuRowDiv.appendChild(pizzaIngredientsDiv)
        
        let pizzaPriceDiv = document.createElement("div")
        pizzaPriceDiv.setAttribute("class", "pizzaPrice")
        pizzaPriceDiv.innerText = data.price
        menuRowDiv.appendChild(pizzaPriceDiv)
        
        let editButton = document.createElement("button")
        editButton.setAttribute("class", "editButton")
        editButton.innerText = "edit"
        // editButton.addEventListener("click", editPizza)
        menuRowDiv.appendChild(editButton)
        
        let deleteButton = document.createElement("button")
        deleteButton.setAttribute("class", "deleteButton")
        deleteButton.innerText = "delete"
        // deleteButton.addEventListener("click", deletePizza)
        menuRowDiv.appendChild(deleteButton)

        menuBody.appendChild(menuRowDiv)
    })
}

// editPizza eventlisterner function

// deletePizza eventlisterner function


