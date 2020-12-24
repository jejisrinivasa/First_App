import {
  GET_PERSONS,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
  PERSON_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

const personReducer = (state, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload],
      };
    case PERSON_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(
          (person) => person._id !== action.payload
        ),
      };
    case UPDATE_PERSON:
      return {
        ...state,
        persons: state.persons.map((person) =>
          person._id === action.payload._id ? action.payload : person
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export default personReducer;
