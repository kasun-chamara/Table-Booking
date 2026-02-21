import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HashRouter } from "react-router-dom"; 
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import Setting from './pages/Restaurant/Setting';
import MealType from './pages/Restaurant/MealType';
import CloseBooking from './pages/Restaurant/CloseBooking';

function App() {
  return (
    <HashRouter>
      <RouterLayout />
    </HashRouter>
  );
}

function RouterLayout() {
  const navigate = useNavigate();

  return (
    <MainLayout onNavigate={(page) => navigate(page)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/mealtype" element={<MealType />} />
        <Route path="/closebooking" element={<CloseBooking />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default App;