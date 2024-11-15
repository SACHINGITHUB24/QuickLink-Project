const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://QUICK:LINKDATAPASS@linksdata.jaczn.mongodb.net/?retryWrites=true&w=majority&appName=LinksData');


const SchemaData = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user',SchemaData);











