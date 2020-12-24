import React, { useContext, useEffect } from "react";
import PersonContext from "../context/PersonContext";

const PersonList = () => {
  const personContext = useContext(PersonContext);

  const { getPersons, persons, deletePerson, setCurrent } = personContext;

  useEffect(() => {
    getPersons();
  }, []);

  const handleDelete = (id) => {
    return deletePerson(id);
  };



  return (
    <div>
      <h1>Persons list</h1>
      {persons.map((person) => {
        return (
          <div key={person._id} className="card p-4 mb-3">
            <h3>
              {person.firstname} {person.lastname}
            </h3>
            <button
              className="btn btn-primary mb-3"
              onClick={() => setCurrent(person)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mb-3"
              onClick={() => handleDelete(person._id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PersonList;
