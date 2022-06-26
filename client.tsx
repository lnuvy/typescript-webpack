import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// pages - 서비스 페이지
// components -
// layouts -  공통적인 레이아웃