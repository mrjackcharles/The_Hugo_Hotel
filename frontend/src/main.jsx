import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CreateRoom from "./pages/createRoom.jsx";
import UpdateRoom from "./pages/updateRoom.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/rooms" replace /> },
    { path: "/rooms", element: <App /> },
    { path: "/create-room", element: <CreateRoom /> },
    { path: "/update-room/:roomId", element: <UpdateRoom /> },
    { path: "*", element: <Navigate to="/rooms" replace /> },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
