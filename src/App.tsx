import React, { useEffect } from 'react';
import { Sidebar } from './components/sidebar/sidebar';
import { Outlet, useNavigate } from "react-router-dom";
import { useUserSessionContext } from './context/UserSessionContext';

import './App.css';

function App() {
  const userSession = useUserSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userSession?.getUserSession()) {
      navigate('/login');
    }
  }, [userSession]);

  return (
      <div test-id="app" className="App">
        <Sidebar />
        <Outlet />
      </div>
  );
}

export default App;
