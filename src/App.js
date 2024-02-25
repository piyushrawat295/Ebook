import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Homie from "./Components/Homie";
import AboutUS from "./Components/AboutUS";
import NoteState from "./context/notes/NoteState";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Homie />} />
            <Route exact path="/AboutUS" element={<AboutUS />} />
          </Routes>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;

