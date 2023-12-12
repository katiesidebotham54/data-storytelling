import './App.css'
import { supabase } from './supabaseClient'
import Dashboard from './Dashboard'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserDashboard from './UserDashboard';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path = "/dashboard" element={<Dashboard />}/>
        <Route path = "/buyer-dashboard" element={<UserDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App