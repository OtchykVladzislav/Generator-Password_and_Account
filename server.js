'use strict'

const express = require('express')
const cors = require("cors");

const app = express()
const jsonParser = express.json()
const fs = require('fs')

const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.use('/', express.static(__dirname + '/public'))

app.post('/addInfo', jsonParser, (req, res) => {
    if (!req.body) res.sendStatus(400)
    fs.writeFileSync('data.txt', JSON.stringify(req.body), (err) => {
        if (err) {
          console.error(err)
          return
        } else {
            console.log("Файл создан или перезаписан");
        }
    })
    res.sendFile(__dirname + '/data.txt')
    
})

app.listen(3000, () => console.log("Сервер запущен..."))