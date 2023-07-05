const express = require("express");
const BodyParser = require("body-parser");

var newItems = [];
var workItems = [];
const app = express();
app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){

    var today = new Date(); // it takes current date
    var options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day = today.toLocaleDateString("en-US",options);
    res.render('list',{listTitle: day, newListItems: newItems});
}); 
 
app.post("/",function(req,res){
  
  var newItem = req.body.item; 
  if(req.body.list === "Work"){
    workItems.push(newItem);
    res.redirect("/work");
  }else{
    newItems.push(newItem);
    res.redirect("/");
  }
  
})

app.get("/work",function(req,res){
     res.render("list",{listTitle:"Work List",newListItems:workItems});
})

app.get("/about",function(req,res){
    res.render("about");
}); 

app.listen(3000,function(){
    console.log("server is running on port 3000");
})

