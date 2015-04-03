var express = require("express")
var db = require("./models")
var app = express();
var bodyParser = require('body-parser');
var Hashids = require("hashids"),

hashids = new Hashids("this is Jake's salt");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", function (req,res) {

  res.render('index');
});


//create - creates an article from post data
app.post('/',function (req,res){
var id = hashids.encode(req.body.userUrl);

  db.link.create({ url: req.body.userUrl, hash: id}).then(function(taco) {
    console.log("created data",taco.get());
  // res.render('links', {url:taco.url});
  });
});


app.get("/links/:id", function(req,res) {

  res.render("links", req.body);
});



// db.link.create({ url: 'www.thisishard.com', hash: 'aasdfsadfasda'}).then(function(data) {
//   console.log("created data", data.get());
// });


// console.log(id);
// var numbers = hashids.decode("qdeN");
// console.log(numbers);


















app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000")
});
