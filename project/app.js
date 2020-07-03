/*Importera*/
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

/*Skapar instans av express*/
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/*body parser middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*Skapa statisk sökväg*/
app.use(express.static(path.join(__dirname, 'public')));

/*Anslut till mongoDB med mongoose */
let mongoose = require('mongoose');

const server = '127.0.0.1:27017'
const database = 'DVGB06DB';

function getCurrentDate() {
    let date_obj = new Date();
    //Day
    let date = ("0" + date_obj.getDate()).slice(-2);
    //Month
    let month = ("0" + (date_obj.getMonth() + 1)). slice(-2);
    //Year
    let year = date_obj.getFullYear();
    //Hours
    let hours = date_obj.getHours();
    //Minutes
    let minutes = date_obj.getMinutes();
    //Seconds
    let seconds = date_obj.getSeconds();

    //date & time in YYYY-MM-DD HH:MM:SS format
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

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
});

/*Läger till bloggpost*/
app.post("/blogg/posts/add", function (req, res) {
    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection succesful')
            /*i kollectionen posts vill jag sortera ut allt 
            (find({} räknat baklängesi från omvänd ordning och plocka ut ett värde vilket
                 är det första som kommer vara det sista eftersom det sortera omvänd ordning.
                 Detta gör jag för att inte få en undefined vaiabel på postID i objektet newPpost*/
            mongoose.connection.db.collection("posts").find({}, { sort: { postId: -1 } }).limit(1).toArray(function (err, data) {
                let newId = 0;
                if(data[0] != null) {
                    newId = parseInt(data[0].postId) + 1
                }
                let postDate = getCurrentDate();
                let newPost = { 
                    postId: newId,
                    userName: req.body.userName,
                    title: req.body.title,
                    content: req.body.content, 
                    postDate: postDate
                }
                mongoose.connection.db.collection("posts").insertOne(newPost, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    mongoose.disconnect();
                })
            })
        })
        .catch(err => {
            console.error('Database conection error')
        })
        return res.send({ "message": "Lägger till bloggpost"});
});


/*Ta bort bloggpost*/
app.delete("/blogg/posts/delete/:id", function (req, res) {
    var deleteId = parseInt(req.params.id);
    mongoose.connect(`mongodb:${server}/${database}`)
        .then(() => {
            console.log('Database connection successful')
            mongoose.connection.db.collection("posts").deleteMany({ _id: deleteId }, function (err, _) {
                if (err) {
                    console.log(err);
                }

            })
        })
        .catch(err => {
            console.error('Database conection error')
        })
        return res.send({"message": "Raderar bloggpost med id " + deleteId })
});

//hämtar alla blogginlägg 
app.get("/blogg/posts/get", function (req, res) {
    /*Conect to mongoDB*/
    mongoose.connect(`mongodb://${server}/${database}`)
    .then(() => {
        console.log('Database connection sucessful')
        mongoose.connection.db.collection("posts").find().toArray(function (err,data)
        {
            console.log(data)
            mongoose.disconnect();
            return res.send(data)
        })
    })
    .catch(err=> {
        console.error('Database connection error')
    })
});

/*Hämtar produkter*/
app.get("/products/get", function (req, res) {
});

/*Hämtar vald produkt*/
app.get("/products/get/:id", function (req, res) {
});

app.get("/products/get/:catId", function (req, res) {
});

app.post("/order/place", function (req, res) {
});

app.get("/order/get/:id", function (req, res) {
});

app.post("/user/logout", function (req, res) {
});

app.post("/user/create", function (req, res) {
});

app.get("/user/get", function (req, res) {
});

app.get("/user/get/:id", function (req, res) {
});

/*port för anslutning*/
var port = 3000;

/*Startar servern*/
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});