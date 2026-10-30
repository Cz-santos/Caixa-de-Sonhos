import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import App from './pages/app/App';
import Login from "./pages/login/index.jsx"
import Erro  from './pages/erro/index.jsx';
import Cadastro from './pages/Cadastro/index.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='*' element={<Erro/>}></Route>
      <Route path='/cadastro' element={<Cadastro/>}></Route>
    </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

