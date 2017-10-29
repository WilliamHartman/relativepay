const express = require('express');
const bodyParser = require('body-parser');
const dCtrl = require(`./controllers/data_controller.js`);
const cors = require('cors')
require('dotenv').config();
const massive = require('massive');
const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');


const xray = new Xray();
const app = express();





const port = 8080;
app.listen(port, () => console.log(`Listening on ${port}`));