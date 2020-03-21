require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const User = require("./models/user");



require("./db/mongoose");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        email: username,
        password: password
    });

    await user.save();
    res.render("secrets");
})


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // console.log(username);
    // console.log(password);
    User.findOne({email: username}, (err, user) => {
        if(!err){
            if(user){
                if(user.password === password){
                    res.render("secrets");
                }else{
                    console.log("Username or Password is invalid");
                }
            }else {
                console.log("Username or Password is invalid");
            }
        }else {
            console.log(err);
        }
    })
})
app.listen(3000, (req, res) => {
    console.log("Sever is up on port no 3000");
});