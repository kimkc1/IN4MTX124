import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/Home';
import Marketplace from './pages/marketplace/Marketplace';
import Settings from './pages/settings/Settings';
import Chat from './pages/chat/Chat';
import Saved from './pages/saved/Saved';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/marketplace" element={<Marketplace />} />
          <Route exact path="/settings" element={<Settings />} /> 
          <Route exact path="/chat" element={<Chat />} /> 
          <Route exact path="/saved" element={<Saved />} /> 
      </Routes>
  </Router>
  );
}

export default App;
