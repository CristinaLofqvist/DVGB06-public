/*Importera*/
import express, { static } from "express";
import { json, urlencoded } from "body-parser";
import { join } from "path";

/*Skapar instans av express*/
var app = express();

/*body parser middleware*/
app.use(json());
app.use(urlencoded({ extended: false }));

/*Skapa statisk sökväg*/
app.use(static(join(__dirname, 'public')));

/*Anslut till mongoDB med mongoose */
import { connect } from 'mongoose';

const server = '127.0.0.1:28008'
const database = 'DVGB06DB';


function mongoConnect(serverAddress, databaseName) {

    connect(`mongodb://${serverAddress}/${databaseName}`)
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error')
        })
}

app.post("/user/login", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.post("/blogg/add", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/blogg/get", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/products/get", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/products/get/:id", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/products/get/:catId", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.post("/order/place", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/order/get/:id", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.post("/user/logout", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.post("/user/create", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/user/get", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.get("/user/get/:id", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

/*port för anslutning*/
var port = 3000;

/*Startar servern*/
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});