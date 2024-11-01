import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App() {
  const [, setMessage ] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <Router>
      <div className="flex flex-col max-h-full w-full ">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;