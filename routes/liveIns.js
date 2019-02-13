 const mongoose =  require ('mongoose');
 const express= require('express');
 const router = express.Router();
 const Joi = require('joi');
 const nodemailer  = require('nodemailer');
const sendgridTransport  = require('nodemailer-sendgrid-transport');

const transporter  =  nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: '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'
    }
}));
 
 //const path = require('path');

 

 const liveInSchema = new mongoose.Schema({
   firstname: {
     type: String,
     required: true,
     minlength: 3,
     maxlength: 50

   },

   lastname: {
     type : String,
     required: true,
     minlength: 3,
     maxlength: 50
   } ,
   phone: {type: String},
   email: {type: String},
   date: {type: Date},
   time: {type: String}
 });

 const LiveIn = mongoose.model('LiveIn', liveInSchema );

 /* const liveIns = [
{id: 1, firstname: 'abcd', lastname: 'efgh', mobile:'0801234578', email: 'abcd@yahoo.com'},
{id: 2, firstname: 'ijkl', lastname: 'mnop', mobile:'09012345678', email: 'mnop@gmail.com'},
{id: 3, firstname: 'rstu', lastname: 'wxyz', mobile:'07012345678', email: 'wxyz@yahoo.com'}
 ];
 */
  /* router.get('/', async (req, res) => {
   const liveIns = await LiveIn.find();
   res.send(liveIns);
    //res.render('index');
  }); */ 
  router.post('/', async (req, res) => {
  
  const { error } = validateInput(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
    let liveIn = new LiveIn( {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time

    });
    liveIn = await liveIn.save();

    let fname = liveIn.firstname;
    let lname = liveIn.lastname;
    let mail = liveIn.email;
    let msg = "Thank you for requesting our service";
    let txt = "A Customer representative will contact you shortly";

await transporter.sendMail({
  to: mail,
  from: 'no-reply@excel.com',
  subject: 'Thank You',
  html: '<h5>Success</h5>'

})    
    res.render('display', {
      msg: msg,
      txt: txt,
      fname: fname,
      lname: lname,
      mail: mail
     });
   });

 /*  router.get('/:id', async (req, res) => {
    const liveIn = await LiveIn.findById(req.params.id);
    //liveIns.find(c => c.id === parseInt(req.params.id));
    if (!liveIn) return res.status(404).send('The carer with the given ID was not found.');
    res.send(liveIn);
  }); */

  /* router.post('/', async (req, res) => {
    const { error } = validateInput(req.query); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let liveIn = new LiveIn( {
      firstname: req.query.firstname
    });
    //liveIns.push(liveIn);
    liveIn = await liveIn.save();
    res.send(liveIn); 
    //res.send(req.body);
    console.log(req.query);
    console.log("########################");
    console.log(req.body);
    res.send("hello");
  }); */
  

  router.put('/:id', async (req, res) => {
    const { error } = validateInput(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
     const liveIn= await LiveIn.findOneAndUpdate(req.params.id, 
      {firstname: req.body.firstname},
      {new : true});
    //const liveIn = liveIns.find(c => c.id === parseInt(req.params.id));
    if (!liveIn) return res.status(404).send('The carer with the given ID was not found.');

    //liveIn.firstname = req.body.firstname; 
    res.send(liveIn);
  });
  
  
  router.delete('/:id', async (req, res) => {

    const liveIn = await LiveIn.findOneAndDelete(req.params.id);
    //liveIns.find(c => c.id === parseInt(req.params.id));
    if (!liveIn) return res.status(404).send('The carer with the given ID was not found.');
    /* const index = liveIns.indexOf(liveIn);
    liveIns.splice(index, 1); */
  
    res.send(liveIn);
  });

  function validateInput(liveIn) {
    const schema = {
      firstname: Joi.string().min(3).required(),
      lastname:Joi.string().min(3).required(),
      phone: Joi.string(),
      email: Joi.string(),
      date: Joi.date(),
      time: Joi.allow(),
      postcode: Joi.allow(),
      service: Joi.allow(),
      message: Joi.string()
    };
  
    return Joi.validate(liveIn, schema);
  }

router.get('/form2', async (req, res)=>{

  const { error } = validateInput(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
    let liveIn = new LiveIn ({
      firstname: req.body.firstname,
      lastname: req.query.lastname,
      phone: req.query.phone,
      email: req.query.email
    });

    liveIn = await liveIn.save();
    let fname = liveIn.firstname;
    let lname = liveIn.lastname;
    let mail = liveIn.email;
    let msg = "Thank you for requesting our service";
    let txt = "A Customer representative will contact you shortly";

    res.render('display', {
      msg: msg,
      txt: txt,
      fname: fname,
      lname: lname,
      mail: mail
     });

   });
//res.send(req.query);
router.get('/form3', async (req, res)=>{

  const { error } = validateInput(req.query); 
  if (error) return res.status(400).send(error.details[0].message);
  
    let liveIn = new LiveIn ({
      firstname: req.query.firstname,
      lastname: req.query.lastname,
      phone: req.query.phone,
      email: req.query.email
    });

    liveIn = await liveIn.save();
    let fname = liveIn.firstname;
    let lname = liveIn.lastname;
    let mail = liveIn.email;
    let msg = "Thank you for requesting our service";
    let txt = "A Customer representative will contact you shortly";

    res.render('display', {
      msg: msg,
      txt: txt,
      fname: fname,
      lname: lname,
      mail: mail
     }); 
     //res.send(req.query);

   });

   router.get('/form', async (req, res)=>{

    const { error } = validateInput(req.query); 
    if (error) return res.status(400).send(error.details[0].message);
    
      let liveIn = new LiveIn ({
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        phone: req.query.phone,
        email: req.query.email
      });
  
      liveIn = await liveIn.save();
      let fname = liveIn.firstname;
      let lname = liveIn.lastname;
      let mail = liveIn.email;
      let msg = "Thank you for requesting our service";
      let txt = "A Customer representative will contact you shortly";
      
  
      res.render('display', {
        msg: msg,
        txt: txt,
        fname: fname,
        lname: lname,
        mail: mail
       }); 
  //res.send(req.query);
  
     });

  

  module.exports =  router;

