import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/Home';
import Marketplace from './pages/marketplace/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          
         
          
      </Routes>
  </Router>
  );
}

export default App;
