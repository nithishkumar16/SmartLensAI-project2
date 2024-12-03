import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './components/NavBar/NavBar';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ImageDetailsPage from "./pages/ImageDetailsPage";
import './App.css';

const App = () => {

  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userid/image/:id" element={<ImageDetailsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
