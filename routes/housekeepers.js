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


const housekeeperSchema = new mongoose.Schema({
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
 
});

const Housekeeper = mongoose.model('Housekeeper', housekeeperSchema );
router.post('/', async (req, res) => {
  
    const { error } = validateInput(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
      let housekeeper = new Housekeeper( {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        
  
      });
      housekeeper = await housekeeper.save();
  
      let fname = housekeeper.firstname;
      let lname = housekeeper.lastname;
      let mail = housekeeper.email;
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

     function validateInput(housekeeper) {
        const schema = {
          firstname: Joi.string().min(3).required(),
          lastname:Joi.string().min(3).required(),
          phone: Joi.string(),
          email: Joi.string(),
        //   date: Joi.date(),
        //   time: Joi.allow(),
        //   postcode: Joi.allow(),
        //   service: Joi.allow(),
        //   message: Joi.string()
        };
      
        return Joi.validate(housekeeper, schema);
      }
      module.exports =  router;