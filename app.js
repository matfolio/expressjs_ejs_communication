//main project modules
var express = require('express')
var app = express()
var  bodyParser= require('body-parser')
var libraryAsset = require('./assets/jsons/asset');
var path    = require("path");

app.use(bodyParser.urlencoded({extended:true}))

// needed to work with the ejs files
// npm install ejs --save must be initiated before using this.
app.set("view engine", "ejs")

// contains project stlesheet asset
app.use('/styles', express.static('assets'))


// Echo welcome message before route handling begins
let welcomeMessage = function (req, res, next) {
  console.log("Welcome to HTML public asset rendering with expressjs");
  console.log("request was made and handled on this route: " + req.path);
  next();

}
//const contents = ["Muftau","Jenii","Mikko"];


// route handling at /
app.get('/', welcomeMessage , function(req,res){

  //paasing object to the library route
  res.render("pages/library", {content : libraryAsset.library});

});

app.post('/', welcomeMessage , function(req,res){

  let result = req.body.item
  result = result.toLowerCase().split(' ').join('');

  console.log("sent form data: " + req.body.item)

  let itemArr = [];
  let notFound = true;
  libraryAsset.library.forEach(function(item){
    let Name = item.Name.toLowerCase().split(' ').join('');
    if(Name === result ){
      
      itemArr.push(item) 
      console.log(itemArr)
      notFound = false;
      //console.log(item)
      
    }

  })

  if(notFound){
    console.log("not found")
    res.redirect("/fallback");
  }
  else{
    notFound = true;
    res.render("pages/library",  {content : itemArr})
  }

  //paasing object to the library route
 // res.render("pages/library",  {content : library});

});
// route handling at /library
app.get('/library', welcomeMessage , function(req,res){

  //paasing object to the library route
  res.render("pages/library",  {content : libraryAsset.library});

});

app.post('/library', welcomeMessage , function(req,res){

  let result = req.body.item
  result = result.toLowerCase().split(' ').join('');

  console.log("sent form data: " + req.body.item)
  let itemArr = []
  let notFound = true;
  libraryAsset.library.forEach(function(item){
    let Name = item.Name.toLowerCase().split(' ').join('');
    if(Name === result ){
      itemArr.push(item) 
      console.log(itemArr)
      notFound = false;
      //console.log(item)
     
    }

  })
  if(notFound){
    console.log("not found")
    res.redirect("/fallback");
  }
  else{
    notFound = true;
    res.render("pages/library",  {content : itemArr})
  }

  //paasing object to the library route
 // res.render("pages/library",  {content : library});

});

app.get('/fallback', welcomeMessage , function(req,res){

  //passing object to the library route
  res.render("pages/fallback");

});

// route handling at /staff
app.get('/staff', welcomeMessage , function(req,res){


  //paasing object to the staff route
  res.render("pages/staff",{content : libraryAsset.staff});

});

app.post('/staff', welcomeMessage , function(req,res){

  let result = req.body.item
  result = result.toLowerCase().split(' ').join('');

  console.log("sent form data: " + req.body.item)

  let itemArr = [];
  let notFound = true;
  libraryAsset.staff.forEach(function(item){
    let Name = item.Name.toLowerCase().split(' ').join('');
    if(Name === result ){
      itemArr.push(item) 
      console.log(itemArr);
      notFound = false;
      
    }
    
    //if(!set){
     // res.render("pages/staff",  {content : itemArr});
    //}
    
    //else
      //res.redirect("/fallback");
  })

  if(notFound){
    console.log("not found")
    res.redirect("/fallback");
  }
  else{
    notFound = true;
    res.render("pages/staff",  {content : itemArr})
  }

  //paasing object to the library route
 // res.render("pages/library",  {content : library});

});

// route handling at /book
app.get('/book', welcomeMessage , function(req,res){

  //paasing object to the book route
  res.render("pages/book", {content : libraryAsset.book});
  // It is also possible to pass object to the render object as a parameter for the rendered pages
  // this would be covered in some other project --- passing values forward to the ejs files.

});

app.post('/book', welcomeMessage , function(req,res){

  let result = req.body.item
  result = result.toLowerCase().split(' ').join('');

  console.log("sent form data: " + req.body.item)

  let itemArr = [];
  let notFound = true;
  libraryAsset.book.forEach(function(item){
    let Name = item.Book.toLowerCase().split(' ').join('');
    if(Name === result ){
      itemArr.push(item) 
      console.log(itemArr)
      //console.log(item)
      notFound = false;
    }

    

  })
  if(notFound){
    console.log("not found")
    res.redirect("/fallback");
  }
  else{
    notFound = true;
    res.render("pages/book",  {content : itemArr})
  }
  //

  ;

  //paasing object to the library route
 // res.render("pages/library",  {content : library});

});

// handling route at port 3000
//like this: localhost:3000/ 
app.listen(3000, function(){
	console.log("You are now connected to the server");
});