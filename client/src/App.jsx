import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin/users" element={<AdminRoute />}>
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;