var express = require("express")
var app = express()

app.get("/register", function(req,res){
    res.render("register");
    console.log(res);
});