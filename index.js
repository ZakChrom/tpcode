const express = require('express')
const path = require('path')
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/main/index.html'));
  app.get('/cookie.js', function(req, res){
      res.sendFile(path.join(__dirname, '/main/cookie.js'));
  });
  app.get('/script.js', function(req, res){
      res.sendFile(path.join(__dirname, '/main/script.js'));
  });
  app.get('/style.css', function(req, res){
      res.sendFile(path.join(__dirname, '/main/style.css'));
  });
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '/docs/index.html'));
  app.get('/docs/style.css', function(req, res){
      res.sendFile(path.join(__dirname, '/docs/style.css'));
  });
});

app.get('/uuid', (req, res) => {
  res.json({"uuid": uuidv4()})
});


app.listen(3000, () => {
  console.log('server started');
});
