const express = require('express');
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload');
const cors = require('cors');
const upload = require('./upload')
const register = require('./regitser')
const validate = require('./validateUpload')

const db = {
   files :
    [
        {
            id : "123",
            url : null
        }
    ],
   writers :
    [
        {
            name: "",
            penname : "Blue",
            email : ""
        }
    ]
}

const server = express();
server.use(cors());
server.use(fileUpload());
server.use(bodyParser.json());

server.post('/upload' , (req,res) => {
    upload.upload(req , res, db)
})

server.post('/register' , (req,res) => {
    register.register(req , res, db)
})

server.post('/validateUpload' , (req,res)=>{
    validate.validate(req, res, db)
})

server.listen(5000 , ()=>{
    console.log("server is lisening at port 5000")
})