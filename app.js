const mongoose = require('mongoose')
const express = require('express');
const bodyParser  = require('body-parser');

const liveIns = require ('./routes/liveIns');

const app = express();

require ('./startup/prod')(app);
const db  = 'mongodb://bionic357:10million@ds227664.mlab.com:27664/cares';
const local = 'mongodb://localhost/vidly';

mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log('connected to mongodb....'))
.catch(err => console.error('could not connect', err));

app.use(express.json());
app.use('/api/liveIns', liveIns);
app.set('view engine', 'ejs');
app.use('/public', express.static(process.cwd() + '/public'));
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
    });
app.get('/live-in-care', (req, res) =>{
    res.render('live-in-care');
    });
app.get('/visiting-care', (req, res) =>{
    res.render('visiting-care');
    });
app.get('/form', (req, res) => {
    res.render('form');
    });
app.get('/form_2', (req, res) => {
  res.render('form_2');
    });
app.get('/form_3', (req, res) => {
  res.render('form_3');
     });
app.get('/contact', (req, res) => {
  res.render('contact');
    });
app.get('/exhibit', (req, res) => {
    res.render('exhibit');
    });

const port= process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}... `));


