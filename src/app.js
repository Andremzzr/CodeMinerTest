require('dotenv').config();
const express = require("express");
const database = require('./database/database');
const app = express();

const bodyParser = require('body-parser');



const urlEncodedParser = bodyParser.urlencoded({extended: false});

database.
then(() => console.log("Connect to MongoDB"));  


//IMPORTING ROUTES
const pilotRoute = require('./routes/pilot');
const contractRoute = require('./routes/contract');
const shipRoute = require('./routes/ship');
const federationRoute = require('./routes/federation');

app.use(bodyParser.json());
app.use(urlEncodedParser);

//SETING ROUTES
app.use('/pilot',pilotRoute);
app.use('/contract',contractRoute);
app.use('/ship',shipRoute);
app.use('/federation',federationRoute);



app.listen(process.env.PORT || 5000, () => console.log(`Server online, on the port ${process.env.PORT || 5000}`));