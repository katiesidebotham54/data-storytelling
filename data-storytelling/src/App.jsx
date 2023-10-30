import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App