import { Navigate, Outlet } from "react-router-dom";

export default function Segurança() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}