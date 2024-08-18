import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/layout';
import Masuk from './pages/masuk';
import Daftar from './pages/daftar';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/masuk" element={<Masuk />} />
                <Route path="/daftar" element={<Daftar />} />
                <Route path="/*" element={<Layout />} /> {/* Semua route lain menggunakan Layout */}
            </Routes>
        </Router>
    );
}

export default App;
