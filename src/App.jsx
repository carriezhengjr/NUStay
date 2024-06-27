import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import HostelInfo from "./components/hostelInfo/HostelInfo";
import SavedHostels from "./components/saved/SavedHostels";
import Profile from "./components/user/Profile"; // Import the Profile component
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

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
      path: "/saved",
      element: <SavedHostels />,
    },
    {
      path: "/profile",
      element: <Profile />, // Add the new route for the profile page
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col mt-12"> {/* Adjusted margin */}
        {routesElement}
      </div>
    </AuthProvider>
  );
}

export default App;
