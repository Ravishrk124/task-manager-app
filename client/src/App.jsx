### src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      {/* This component allows us to show toast notifications anywhere in the app */}
      <Toaster position="top-right" /> 

      <div className="font-sans">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          {/* We'll add our Login, Register, and Dashboard routes here soon. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;