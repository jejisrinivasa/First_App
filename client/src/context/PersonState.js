import React, { useReducer } from "react";
import PERSONCONTEXT from "./PersonContext";
import PersonReducer from "./personReducer";

import {
  GET_PERSONS,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
  PERSON_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";
import axios from "axios";

const PersonState = (props) => {
  const initialState = {
    persons: [],
    error: null,
    current: null,
  };

  const [state, dispatch] = useReducer(PersonReducer, initialState);

  //get all perons
  const getPersons = async () => {
    try {
      const res = await axios.get("/api/person/read");
      dispatch({
        type: GET_PERSONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PERSON_ERROR,
        payload: err.response.data,
      });
    }
  };

  //delete person
  const deletePerson = async (id) => {
    try {
      await axios.delete(`/api/person/${id}`);
      dispatch({
        type: DELETE_PERSON,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: PERSON_ERROR,
        payload: err.response.data,
      });
    }
  };

  //add person
  const addPerson = async (personData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/person/create", personData, config);
      dispatch({
        type: ADD_PERSON,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PERSON_ERROR,
        payload: err.response.data,
      });
    }
  };

  //set current
  const setCurrent = (person) => {
    dispatch({
      type: SET_CURRENT,
      payload: person,
    });
  };

  const updatePerson = async (person) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/person/${person._id}`, person, config);
      dispatch({
        type: UPDATE_PERSON,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PERSON_ERROR,
        payload: err.response.data,
      });
    }
  };

  return (
    <PERSONCONTEXT.Provider
      value={{
        persons: state.persons,
        current: state.current,
        addPerson,
        getPersons,
        deletePerson,
        setCurrent,
        updatePerson,
      }}
    >
      {props.children}
    </PERSONCONTEXT.Provider>
  );
};

export default PersonState;
