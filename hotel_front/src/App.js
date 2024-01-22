import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './components/MyRoutes';

function App() {
  useEffect(() => {
    document.title = 'HotelApplication';
  }, []);
  return (
    <Router>
      <MyRoutes />
    </Router>
  );
}

export default App;