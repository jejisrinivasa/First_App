import React from "react";

import "./App.css";
import PersonsForm from "./components/PersonsForm";
import PersonList from "./components/PersonList";
import PersonState from "./context/PersonState";

function App() {
  return (
    <PersonState>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <PersonsForm />
          </div>
          <div className="col-md-6">
            <PersonList />
          </div>
        </div>
      </div>
    </PersonState>
  );
}

export default App;
