import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Orders } from './components/orders/orders'
import { Login } from './components/login/login'
import { Dashboard } from './components/dashboard/dashboard'
// import { APIContextProvider } from './context/APIContext';
import { UserSessionProvider } from './context/UserSessionContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "orders/",
        element: <Orders />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(
  // <React.StrictMode>
  //   {/* !TODO: Here we need to create config for endpoint */}
  //   <APIContextProvider endpoint='https://freddy.codesubmit.io'>
  //     <RouterProvider router={router} />
  //   </APIContextProvider>
  // </React.StrictMode>

  <React.StrictMode>
    {/* !TODO: Here we need to create config for endpoint */}
    <UserSessionProvider>
      <RouterProvider router={router} />
    </UserSessionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
