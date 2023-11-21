import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Team from "../components/Team";
import TeamDetails from "../components/TeamDetails";
import CreateUser from "../components/CreateUser";
import UserDetails from "../components/UserDetails";
import EditUser from "../components/EditUser";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/user-details/:id',
                element: <UserDetails/>
            },
            {
                path: '/edit-user/:id',
                element: <EditUser/>
            },
            {
                path: '/team',
                element: <Team/>
            },
            {
                path: '/team-details/:id',
                element: <TeamDetails/>
            },
            {
                path: '/create-user',
                element: <CreateUser/>
            },
        ]
    },
   
   
])

export default routes;