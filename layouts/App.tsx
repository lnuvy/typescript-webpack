import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';

const Login = loadable(() => import('@pages/login'));
const SignUp = loadable(() => import('@pages/signUp'));
const Channel = loadable(() => import('@pages/channel'));
const DirectMessage = loadable(() => import('@pages/directMessage'));

// const queryClient = new QueryClient();
const App = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/workspace/channel' element={<Channel />} />
      <Route path='/workspace/dm' element={<DirectMessage />} />
      <Route path='*' element={<Login />} />
    </Routes>
    // </QueryClientProvider>
  );
};

export default App;
