const mongoose = require("mongoose"); //it is a package used to manipulate(or)perform operations on the mongodb database

const config = require("config"); //it is used for security and also give access to the online mongodb database 
//it is also used to get the information from json files

//it is a type of url
const uri = config.get("mongoURI");

//it is used to connect the online database using mongoose
const dbconnect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MOngodb connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1); //it is to exit the process
  }
};

module.exports = dbconnect; //it is olden way of export
