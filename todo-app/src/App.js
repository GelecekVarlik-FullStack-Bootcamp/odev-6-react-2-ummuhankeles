import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Todos from './components/Todos/Todos';
//import Register from './components/Register/Register';
import { Routes, Route } from 'react-router-dom';
import Categories from './components/Categories/Categories';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='todos' element={<Todos/>}/>
      <Route path='categories' element={<Categories/>}/>
    </Routes>
  );
}

export default App;
