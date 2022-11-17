import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/Home';
import './style.css' 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BeerItem from './components/beerItem/BeerItem'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/beer/:id' element={<BeerItem/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
