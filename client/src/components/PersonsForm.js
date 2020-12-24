import React, { useState, useContext, useEffect } from "react";
//import PersonList from "./PersonList";
import PersonContext from "../context/PersonContext";

const PersonsForm = () => {
  const personContext = useContext(PersonContext);

  const { current, updatePerson, addPerson, setCurrent } = personContext;

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
  });
  // const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (current !== null) {
      setPerson(current);
    } else {
      setPerson({
        firstname: "",
        lastname: "",
      });
    }
  }, [current]);

  const { firstname, lastname } = person;

  const onChangeInput = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  //   const [firstname, setFirstname] = useState("");
  //   const [lastname, setLastname] = useState("");
  const onSubmitDetails = (e) => {
    e.preventDefault();
    // const newPerson = {
    //   firstname,
    //   lastname,
    // };
    //console.log(newPerson);
    // setPersons([...persons, newPerson]);
    if (current === null) {
      addPerson(person);
    } else {
      updatePerson(person);
      const rip = null;
      setCurrent(rip);
    }

    setPerson({
      firstname: "",
      lastname: "",
    });
  };
  return (
    <div>
      <h1>{current === null ? "Add Person" : "Edit Person"}</h1>
      <form onSubmit={onSubmitDetails}>
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            placeholder="FirstName"
            name="firstname"
            required
            className="form-control"
            value={firstname}
            onChange={onChangeInput}
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            placeholder="LastName"
            name="lastname"
            required
            value={lastname}
            onChange={onChangeInput}
            className="form-control"
          />
          <button className="btn btn-success btn-block mt-4">
            {current === null ? "Add" : "Edit"}
          </button>
        </div>
      </form>
      {/* <h3>{firstname}</h3>
      <h3>{lastname}</h3> */}
      {/* <PersonList allpersons={persons} /> */}
    </div>
  );
};

export default PersonsForm;
