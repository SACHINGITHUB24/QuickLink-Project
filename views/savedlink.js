const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://QUICK:LINKDATAPASS@linksdata.jaczn.mongodb.net/?retryWrites=true&w=majority&appName=LinksData');



const linkschema = new mongoose.Schema({
    title: String,
    url: String,
  
})

module.exports = mongoose.model("links", linkschema);

//username
//QUICK

//Password
//LINKDATAPASS

