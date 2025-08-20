import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Task Manager</Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Admin-only link */}
                {user.role === 'admin' && (
                  <li>
                    <Link
                      to="/admin/users"
                      className="text-gray-600 hover:text-blue-600 font-semibold"
                    >
                      Manage Users
                    </Link>
                  </li>
                )}

                <li className="font-semibold">Hello, {user.email}</li>
                <li>
                  <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
