

const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

// mongoose 
const mongoose = require('mongoose');

main().catch(err => console.log(err));
// initiating mongoose in the server 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gymform');
}
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String
  });
  const Contact = mongoose.model('Contact', ContactSchema);  


// EXPRESS 
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG 
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
   
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
   
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
   
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{
   
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/info', (req, res)=>{
   
    const params = { }
    res.status(200).render('info.pug', params);
})
// saving data from the contact form 
app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});