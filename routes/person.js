const express = require("express");
const Person = require("../models/Person");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //it is used for checking

//CRUD operations
//we use "post" for "create"
//we use "get" for "read" or "display"
//we use "put" for "update" or "edit"
//we use "delete" for "delete" or "remove"

//for putting into database
router.post(
  "/create",
  //middleware
  [
    // first parameter in check is the field we want to check and the second parameter is the error message
    check("firstname", "firstname is required").not().isEmpty(),
    check("lastname", "lastname is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { firstname, lastname } = req.body;

    // let person = new Person({
    //   firstname,
    //   lastname,
    // });
    //or
    // let person = new Person({
    //   firstname: firstname,
    //   lastname: lastname,
    // });

    Person({ firstname, lastname }) //Person({ firstname, lastname }) or 'person' in this line
      .save()
      .then((per) => res.send(per))
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: "internal error..." });
      });
  }
);

//for displaying all data from the database
router.get("/read", (req, res) => {
  Person.find()
    .then((per) => res.send(per))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("internal error");
    });
});

//for deleting the data at the particulat id
router.delete("/:personId", (req, res) => { //here ':' is used because personId can be varied-
  Person.findById(req.params.personId)
    .then(() => {
      Person.findByIdAndDelete(req.params.personId)
        .then(() => res.send("Deleted successfully"))
        .catch((err) => res.send("Deletion failed"));
    })
    .catch((err) => res.status(500).send("Couldn't find the person"));
});

//for updating the values of a person
router.put("/:id", async (req, res) => {
  const { firstname, lastname } = req.body;
  const person = {};
  if (firstname) person.firstname = firstname;
  if (req.body.lastname) person.lastname = req.body.lastname;

  try {
    const per = await Person.findById(req.params.id);
    if (!per) {
      return res.status(404).send("Person is not found");
    }

    const updatedperson = await Person.findByIdAndUpdate(
      req.params.id,
      { $set: person },
      { new: true }
    );
    res.json(updatedperson);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
});

module.exports = router;
