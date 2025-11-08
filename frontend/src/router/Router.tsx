import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup";
import About from "../pages/nav/About";

import Home from "../pages/nav/Home";
import Contact from "../pages/nav/Contact";
import Profile from "../pages/auth/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home /> // OVERRIDE OUTLET
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            }
        ],
    }
])


export default router;