const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");
const port = 5050;
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(`${__dirname}/../frontend/`));





app.listen(port,()=>{
    console.log(`the server is runing on ${port}`)
})
