const mongoose = require("mongoose");

//schema is a model like 'CREATE TABLE' in the sql
const PersonSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("person", PersonSchema);
//in the above line 'person' is used as a reference
