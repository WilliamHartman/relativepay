const express = require('express');
const bodyParser = require('body-parser');
const dCtrl = require(`./controllers/data_controller.js`);
const cors = require('cors')
require('dotenv').config();
const massive = require('massive');
const baseURL = `/api/salaries`;

//Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../build'));

massive(process.env.CONNECTION_STRING)
.then(db => {
    console.log('Connected to Heroku')
    app.set('db', db)
}).catch(err=>console.log(err))

//Endpoints
app.get(`${baseURL}/get/:job`, dCtrl.getSalaries)
app.get(`${baseURL}/getpopularjobs`, dCtrl.getPopularJobs)
app.get(`${baseURL}/getbystate/:job`, dCtrl.getSalariesByState)
app.get(`${baseURL}/getbycity/:job`, dCtrl.getSalariesByCity)
app.get(`${baseURL}/getbyrank/:job`, dCtrl.getSalariesByRank)


const port = 8080;
app.listen(port, () => console.log(`Listening on ${port}`));