import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import App from './pages/app/App';
import Login from "../src/pages/login/index.jsx"
import Erro  from './pages/erro/index.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/lo' element={<Login/>}></Route>
      <Route path='*' element={<Erro/>}></Route>
    </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

