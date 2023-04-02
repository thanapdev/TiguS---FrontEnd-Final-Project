const mongoose = require('mongoose');


exports.connect = () => {
    mongoose.connect('mongodb+srv://thanap151255:strike151255!@theprojectdevops.rt6r3hr.mongodb.net/TiguSDB')
      .then(() => console.log('Database is connected'))
      .catch((e) => console.log(e));
     //add items to food database in mongodb
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://thanap151255:strike151255!@theprojectdevops.rt6r3hr.mongodb.net/TiguSDB';
const client = new MongoClient(uri);
};


