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
// var id = hashids.encode(req.body.userUrl);

  var bigUrl = req.body.userUrl;
  var newHash;
  db.link.create({ url: bigUrl}).then(function(url) {
   newHash = hashids.encode(url.id);
  }).then(function(url) {
    db.link.find({where: {url: bigUrl}}).then(function(url) {
      url.hash= newHash;
      url.save().then(function(url) {
        var hashObject = {hash: req.headers.host +"/" + url.hash};
        res.render('links', hashObject);
      });
    });
  });
});




app.get("/:id", function(req,res) {
  var id= req.params.id;
  db.link.find({where: {hash: id}}).then(function(taco){
    console.log(taco.hash + "aaaaaaaaaaaaaaaaa")
    res.redirect(taco.dataValues.url)
  })

});



// db.link.create({ url: 'www.thisishard.com', hash: 'aasdfsadfasda'}).then(function(data) {
//   console.log("created data", data.get());
// });


// console.log(id);
// var numbers = hashids.decode("qdeN");
// console.log(numbers);


// req.headers.host















app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000")
});
