const express = require('express')
const exprhdlbr = require('express-handlebars')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();

app.get('/', (req,res) =>{
    res.render('contact.handlebars', {layout:false})
})


//view-engine setup for email
app.engine('handlebars', exprhdlbr())
app.set('view-engine', 'handlebars')

// view engine setup for text-message

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

app.post('/send',  (req, res)=>{
    console.log(req.body)


const output = `
<h2>Your Account Has been Succesfully created with follwing credentials</h2>
<ul>
<li>First Name: ${req.body.name}</li> 
<li>Last Name: ${req.body.company}</li> 
<li>Email: ${req.body.email}</li> 
<li>Phone: ${req.body.phone}</li>
</ul>
`

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'milanchal12@gmail.com', // generated ethereal user
      pass: 'Starbucks$6' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info ={
    from: '"Travoscope Hotels®" <milanchal13@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Account Created!", // Subject line
    html: output // html body
  };

  transporter.sendMail(info, (error, info) =>{
      if (error){
          console.log(error)
      }
      console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  })

  

res.send({msg:"Email has been sent"})


})


const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server Started at port ${PORT}!`)
})

