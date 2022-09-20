import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import RolesPage from './pages/RolesPage'

function App() {
  return (
    <div className="bg-gray-100">
    <Router>
      <Navbar />
        <Routes>
            <Route path="/roles" element={<RolesPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
