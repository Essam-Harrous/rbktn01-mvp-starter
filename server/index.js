var express = require('express');
var bodyParser = require('body-parser');
const memeTemplate = require('../database-mongo/index.js').memeTemplate;
const generatedMeme = require('../database-mongo/index.js').generatedMeme
const axios = require('axios')


// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/memeTemplates', (req, res) =>{
  memeTemplate.find({box_count: 2}, null ,{limit: 25},(err, data)=> {
    res.json(data)
  })
});

app.get('/generatedMemes', (req, res) =>{
  generatedMeme.find({},(err, data)=> {
    res.json(data)
  })
});

app.post('/generateMeme', (req, res) => {
  console.log(req.body)
  axios.post(`https://api.imgflip.com/caption_image?template_id=${req.body.template_id}&username=${req.body.username}&password=${req.body.password}&text0=${req.body.boxes[0].text}&text1=${req.body.boxes[1].text}`, {
    'usrename': 'im'
  })
  .then(function (response) {
    console.log(response.data.data);
    generatedMeme.create({...response.data.data, name: req.body.name},(err, data)=> {
      res.json(data)
    })
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

