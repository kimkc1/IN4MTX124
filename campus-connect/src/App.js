import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/Home';
import Marketplace from './pages/marketplace/Marketplace';
// import Settings from './pages/settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
  </Router>
  );
}

export default App;
