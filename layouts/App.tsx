import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';

const Login = loadable(() => import('@pages/login'));
const SignUp = loadable(() => import('@pages/signUp'));
const Workspace = loadable(() => import('@layouts/workspace')); // react-router-dom v6 에서 중첩라우팅시 * 를 사용하자
// const Channel = loadable(() => import('@pages/channel'));
// const DirectMessage = loadable(() => import('@pages/directMessage'));

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/workspace/:workspace/*' element={<Workspace />} />
      <Route path='*' element={<Login />} />
    </Routes>
  );
};

export default App;
