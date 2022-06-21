import React from "react";
import { Routes, Route } from 'react-router-dom'
import Login from '@pages/login'
import SignUp from '@pages/signUp'

const App = ()=> {
    return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
}

export default App;