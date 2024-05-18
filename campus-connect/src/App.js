import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/Home';
import Marketplace from './pages/marketplace/Marketplace';
import Settings from './pages/settings/Settings';
import UploadMarketplace from './pages/marketplace/UploadProduct';
import Chat from './pages/chat/Chat';
import Saved from './pages/saved/Saved';
import ProductDetails from './pages/marketplace/ProductDeatils';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';


function App() {
  return (
    <Router>
      <Routes>
          <>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/marketplace" element={<Marketplace />} />
            <Route exact path="/marketplace/uploadProduct" element={<UploadMarketplace />} />
            <Route exact path="marketplace/product/:productId" element={<ProductDetails />} />
            <Route exact path="/settings" element={<Settings />} /> 
            <Route exact path="/chat" element={<Chat />} /> 
            <Route exact path="/saved" element={<Saved />} /> 
            <Route exact path="/homepage" element={<HomePage />} />
            <Route exact path="/profile" element={<Profile />} />
          </>
      </Routes>
  </Router>
  );
}

export default App;
