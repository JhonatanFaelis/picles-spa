import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Pets } from "./pages/Pets/Pets";
import { PetDetails } from "./pages/PetDetails/PetDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/pets',
        children: [
            {
                index: true,
                element: <Pets />
            },
            {
                path: '/pets/:id',
                element: <PetDetails />
            },
        ]
    },
    {
        path: '/petsDetails',
        element: <PetDetails />
    },
    {
        path: '/admin',
        element: <h1>Admin</h1>
    },
])


export default router