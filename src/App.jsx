import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HashRouter } from "react-router-dom"; 
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import Setting from './pages/Restaurant/Setting';
import MealType from './pages/Restaurant/MealType';
import CloseBooking from './pages/Restaurant/CloseBooking';
import ComponentList from './components/ComponentList';

function App() {
  return (
    <HashRouter>
      <RouterLayout />
    </HashRouter>
  );
}

function RouterLayout() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <MainLayout onNavigate={(page) => navigate(page)} darkMode={darkMode} setDarkMode={setDarkMode}>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/setting" element={<Setting darkMode={darkMode} />} />
        <Route path="/mealtype" element={<MealType darkMode={darkMode} />} />
        <Route path="/closebooking" element={<CloseBooking darkMode={darkMode} />} />
        <Route path="/components" element={<ComponentList darkMode={darkMode} />} />
        <Route path="*" element={<Home darkMode={darkMode} />} />
      </Routes>
    </MainLayout>
  );
}

export default App;