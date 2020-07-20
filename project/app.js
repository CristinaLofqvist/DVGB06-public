/*Importera*/
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var bcrypt = require('bcrypt')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var cors = require('cors')

/*Skapar instans av express*/
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
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
const connection = mongoose.createConnection(`mongodb://${server}/${database}`)
app.use(cors())
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: connection
    })
}));



function getCurrentDate() {
    let date_obj = new Date();
    //Day
    let date = ("0" + date_obj.getDate()).slice(-2);
    //Month
    let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
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

/*Login*/
app.post("/user/login", function (req, res) {
    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection succesful')
            mongoose.connection.db.collection("users").find({ user_name: req.body.userName }).toArray(function (err, data) {
                if (data[0] == null) {
                    return
                }
                var password_form_database = data[0].password
                var _id_from_database = data[0]._id
                bcrypt.compare(req.body.password, password_form_database, function (err, result) {
                    if (result === true) {
                        req.session.userId = _id_from_database
                        return res.send({ "message": "Inloggning lyckades" });
                    } else {
                        console.log("Authentication failed")
                        return res.send({ "message": "Inloggning misslyckades" });
                    }
                })
            })
        })
        .catch(err => {
            console.error('Database connection error')
        })
});
/*Logout*/
app.post("/user/logout", function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                console.log("Logout failed")
            } else {
                return res.redirect('/');
            }
        });
    }
});
/*Skapar användare*/
app.post("/user/create", function (req, res) {
    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection succesful')
            mongoose.connection.db.collection("users").find({ user_name: req.body.userName }).toArray(function (err, data) {
                if (data[0] != null) {
                    console.log('Username already present');
                    return res.send({ "message": "En användare med användarnamn " + req.body.userName + " finns redan" });
                }
                mongoose.connection.db.collection("users").find({}, { sort: { userId: -1 } }).toArray(function (err, data) {
                    var newId = 0
                    if (data[0] != null) {
                        newId = parseInt(data[0].userId) + 1
                    }
                    bcrypt.hash(req.body.password, 10)
                        .then((val) => {
                            let newUser = {
                                userId: newId,
                                first_name: req.body.firstName,
                                last_name: req.body.lastName,
                                user_name: req.body.userName,
                                email: req.body.email,
                                password: val
                            }
                            res.send({ "message": "Lägger till användare" });
                            mongoose.connection.db.collection("users").insertOne(newUser,() => {
                                console.log("1 document inserted");
                                mongoose.disconnect();
                            })
                        })
                        .catch(err => {
                            console.error('Hashing error')
                            return res.send({ "message": "Fel vid registrering av användare" });
                        })
                })
            })
        })

        .catch(err => {
            console.error('Database connection error')
        })
});


/*Hämtar användare*/
app.get("/user/get", function (req, res) {
});

/*Hämtar användar id*/
app.get("/user/get/:id", function (req, res) {
});

/*Läger till bloggpost*/
app.post("/blogg/posts/add", function (req, res) {
    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection succesful')
            /*i kollectionen posts vill jag sortera ut allt 
            (find({} räknat baklänges ifrån omvänd ordning och plocka ut ett värde vilket
                 är det första som kommer vara det sista eftersom det sortera omvänd ordning.
                 Detta gör jag för att inte få en undefined variabel på postID i objektet newPpost*/
            mongoose.connection.db.collection("posts").find({}, { sort: { postId: -1 } }).limit(1).toArray(function (err, data) {
                let newId = 0;
                if (data[0] != null) {
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
    return res.send({ "message": "Lägger till bloggpost" });
});


/*Tar bort bloggpost*/
app.delete("/blogg/posts/delete/:id", function (req, res) {
    var deleteId = parseInt(req.params.id);
    mongoose.connect(`mongodb:${server}/${database}`)
        .then(() => {
            console.log('Database connection successful')
            mongoose.connection.db.collection("posts").deleteMany({ postId: deleteId }, function (err, _) {
                if (err) {
                    console.log(err);
                }

            })
        })
        .catch(err => {
            console.error('Database conection error')
        })
    return res.send({ "message": "Raderar bloggpost med id " + deleteId })
});

//hämtar alla blogginlägg 
app.get("/blogg/posts/get", function (req, res) {
    /*Connect to mongoDB*/
    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection sucessful')
            mongoose.connection.db.collection("posts").find().toArray(function (err, data) {
                console.log(data)
                mongoose.disconnect();
                return res.send(data)
            })
        })
        .catch(err => {
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


/*port för anslutning*/
var port = 3000;

/*Startar servern*/
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});