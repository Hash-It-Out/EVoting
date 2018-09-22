var express=require('express');
var bparser=require('body-parser');
var control=require('./controllers/control');

var app=express();

//set up template engine
app.set('view engine','ejs');
//use static files
app.use(express.static('./public'));
app.get("/",function(req,res){
    res.send("working");
});
control(app);

app.listen(3000);
//fire controllers which handles the routing
