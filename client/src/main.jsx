### src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store.js'; // Import the store
import { Provider } from 'react-redux';   // Import the Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the App component */}
      <App />
    </Provider>
  </React.StrictMode>,
);