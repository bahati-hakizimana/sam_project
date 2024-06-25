
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/form/Login";
import Signup from "./components/form/Signup";
import Layout from "./components/admin/Layout";
import Notification from "./components/admin/pages/Notification"
import BenchMarks from "./components/admin/pages/BenchMarks"
import Report from "./components/admin/pages/Report"
import Users from './components/admin/pages/Users';
import Tenant_Layout from './components/tenant/Tenant_Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}

        <Route path='/admin' element={<Layout />}>
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/notifications' element={<Notification />} />
        <Route path='/admin/benchmarks' element={<BenchMarks />} />
        <Route path='/admin/report' element={<Report />} />
        </Route>

        {/* Tenant Routes */}
        <Route path='/tenant'  element={<Tenant_Layout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

