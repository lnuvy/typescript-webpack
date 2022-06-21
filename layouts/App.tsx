import React from "react";
import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom'

const Login = loadable(() => import('@pages/login'))
const SignUp = loadable(() => import('@pages/signUp'))

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