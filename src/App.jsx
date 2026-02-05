import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPlaceholder from './pages/RegisterPlaceholder';
import './styles/global.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPlaceholder />} />
        </Routes>
    );
}

export default App;
