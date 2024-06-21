
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/form/Login";
import Signup from "./components/form/Signup";
import Layout from "./components/admin/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}

        <Route path='/admin' element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

