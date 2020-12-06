const express = require('express');
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload');
const getprofile = require('./getprofile')
const cors = require('cors');
const upload = require('./upload')
const login = require('./login')
const register = require('./regitser')
const validate = require('./validateUpload')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')

const database = knex({
    client : 'pg',
    connection : {
        host : '127.0.0.1',
        user : "postgres",
        password: "blue",
        database : "iwriter"
    }
})



const server = express();
server.use(cors());
server.use(fileUpload());
server.use(bodyParser.json());

server.post('/upload' , (req,res) => {
    upload.upload(req , res, database)
})

server.post('/login' , (req, res)=>{
    login.login(req, res, database, bcrypt)
})

server.post('/register' , (req,res) => {
    register.register(req , res, database, bcrypt)
})

server.post('/validateUpload' , (req,res)=>{
    validate.validate(req, res, database)
})

server.post('/getprofile', (req,res)=>{
    getprofile.getprofile(req,res,database)
})

server.listen(5000 , ()=>{
    console.log("Server running on port 5000")
})