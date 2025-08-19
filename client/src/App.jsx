### src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login'; // Import Login
import Register from './pages/Register'; // Import Register

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<h1>Home Page - Should be Dashboard</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;