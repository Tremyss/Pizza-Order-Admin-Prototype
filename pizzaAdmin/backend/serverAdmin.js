const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");
const port = 5050;
const cors = require('cors');
const path = require("path");

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(`${__dirname}/../frontend/`));
app.use(express.static(`${__dirname}/../../pizzaDatabase/`));

const dataBaseFilePath = `${__dirname}/../../pizzaDatabase/pizzaDatabase.json`


app.get("/order", (req,res)=>{

    // Order fajlok kiolvasasa mappabol:

const ordersFolder = '../../pizzaDatabase/orders/';
const incomingOrders =[];
fs.readdirSync(ordersFolder).forEach(file => {
    const dataBaseFilePath = path.join(`${__dirname}/../../pizzaDatabase/orders/${file}`)
    const fileData = fs.readFileSync(dataBaseFilePath)
    incomingOrders.push(JSON.parse(fileData))
  });

  res.json(incomingOrders)

})


// ? kiolvassa és visszaadja a database objectet
const getDatabase = () => {
    const pizzasJson = fs.readFileSync(dataBaseFilePath);
    // todo img database beolvasása
    return JSON.parse(pizzasJson);    
}

const saveChangedData = (dataObject) => {
    const dataString = JSON.stringify(dataObject)
    fs.writeFileSync(dataBaseFilePath, dataString, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
}

app.get('/admin', (req, res) => {
    const dataBase = getDatabase();
    // * még jól jöhet, ha a frontenden nem megfelelő a response 
    // res.json(typeof JSON.stringify(dataBaseResponse));
    res.json(dataBase);
});

app.delete('/admin', (req, res) => {
    // ? beolvassuk a database-t, kiválasztunk egy pizza entry-t
    // ? a database entry id-je alapján filterezzük - azt az egyet kiveszi, a többi pizzát bennehagyja
    // ? létrejön a módosított adatbázis, amit visszaírunk a file-ba
    // ? az eredeti képfile törlése
    // ? megerősítő kérdés törlés előtt
    // ? fs.unlinkSync - file törlés image galeryből
    /* {
        "id": 12,
        "picture": "images/pizza12.jpg"
    } */
    const picturePath =`${__dirname}/../../pizzaDatabase/images/pizza${req.body.id}.jpg`
    fs.unlinkSync(picturePath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
    // ? az unlinkSync method mindenképpen megvárja a req-t, és kitörli a file-t
    const dataBase = getDatabase();
    const dataToDelete = req.body.id;
    const newDatabase = dataBase.filter((data) => data.id !== dataToDelete) 
    
    // ? writeFileSync 3 paraméter: 1.hova, 2.tartalom, 3. error function
    
    saveChangedData(newDatabase);

    /* fs.writeFileSync(dataBaseFilePath, newDatabase, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }); */
    res.json(200)
});

app.post("/admin",(req,res)=>{

    const dataBase = getDatabase();
    const newId=dataBase[dataBase.length-1].id+1
    const newUploadedData = req.body;
    // a database price ára, string és tegyük át számmá. !!!!
    Number(newUploadedData.price);
 
    newUploadedData.id =newId;
    newUploadedData.amount = 0;
    newUploadedData.image = `../images/pizza${newId}.jpg`;
    dataBase.push(newUploadedData)
    saveChangedData(dataBase)
 // Image upload eleje :
    const picturePath =`${__dirname}/../../pizzaDatabase/images/pizza${newId}.jpg`
    if(req.files){
        const uploadedImage = req.files.image;
        uploadedImage.mv(picturePath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
    }
// Image upload vege!
    res.send()
})

// ! Edit request handler
// ? A lemódosított adatot elmentjük az adatbázisba

app.put('/admin', (req,res) => {
    const currentDatabase = getDatabase();
    
    const modifiedItem = req.body

    const newDatabase = []

    for (const item of currentDatabase) {
        if (item.id == modifiedItem.id) {   
              
            item.name = modifiedItem.name
            item.ingredients = modifiedItem.ingredients
            item.price = modifiedItem.price
            item.status = modifiedItem.status
        }
        newDatabase.push(item)
    }

    saveChangedData(newDatabase);
    res.sendStatus(200)
    console.log(newDatabase);
    
    const picturePath =`${__dirname}/../../pizzaDatabase/images/pizza${req.body.id}.jpg`
    if(req.files){
        const uploadedImage = req.files.image;
        uploadedImage.mv(picturePath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
    }
});

app.listen(port,()=>{
    console.log(`the server is runing on ${port}`)
})
