const request = require('request');
const memeTemplate = require('./index.js').memeTemplate;

request('https://api.imgflip.com/get_memes', (err, res)=> {
  var memesArr = JSON.parse(res.body).data.memes
  console.log(memesArr)
  memeTemplate.create(memesArr, (err, res)=> {
    console.log(res)
  })
})