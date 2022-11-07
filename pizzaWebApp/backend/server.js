const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const uuid = require("uuid")
const port = 8080

app.use(express.json())
app.use(express.static(`${__dirname}/../frontend/`));
app.use(express.static(`${__dirname}/../../pizzaDatabase/`));

app.get("/", (req, res)=> {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.get("/api", (req, res)=> {
    const pizzasJson = fs.readFileSync(`${__dirname}/../../pizzaDatabase/pizzaDatabase.json`)
    const pizzasObj = JSON.parse(pizzasJson)
    res.json(pizzasObj)
})

app.post("/order", (req, res) => {
    const customerName = req.body.name.replaceAll(" ", "_")
    const date = JSON.stringify(new Date()).replaceAll(":", "-").replaceAll(".", "-").replaceAll('"', '')
    req.body.id = uuid.v4();
    console.log(req.body)
    console.log(req.body.id)
    const fileName = `${req.body.id}.json`  
    const orderData = JSON.stringify(req.body)
    const uploadPath = __dirname + `/../../pizzaDatabase/orders/` + fileName
    fs.writeFile(uploadPath, orderData, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	})
    res.json(res.status)
})

app.listen(port, ()=> {
    console.log(`server is listening to port ${port}`);
})