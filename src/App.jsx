import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import HostelInfo from "./components/hostelInfo/HostelInfo";
import FilterPage from "./components/filter/FilterPage"; 
import { AuthProvider } from "./contexts/authContext";
import { HostelProvider } from "./contexts/HostelContext";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/hostel/:id",
      element: <HostelInfo />,
    },
    {
      path: "/filter",
      element: <FilterPage />,
    }
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <HostelProvider>
        <Header />
        <div className="w-full h-screen flex flex-col mt-12"> {/* Adjusted margin */}
          {routesElement}
        </div>
      </HostelProvider>
    </AuthProvider>
  );
}

export default App;
