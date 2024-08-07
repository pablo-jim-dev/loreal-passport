import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const { signin, isAuthenticated, user: userAuth } = useAuth();

    const handleLogin = async () => {
        if (!user.username || !user.password) {
            toast.error("Por favor, rellene todos los campos");
            return;
        }
        try {
            await signin(user);
            navigate("/menu");
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    }

    useEffect(() => {
        if (isAuthenticated && userAuth) {
            navigate("/menu");
        }
    }, [isAuthenticated, userAuth]);

    return (
        <div className="flex flex-1 w-full h-screen bg-white">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <FaUserCircle className="text-6xl text-[#34333A]" />
                <div className="flex flex-col items-center justify-center w-80 h-80 rounded-lg gap-12">
                    <div className="flex flex-col justify-center items-center w-full gap-6">
                        <Input placeholder="Nombre de usuario" size="lg" variant="underlined" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <Input placeholder="Contraseña" size="lg" variant="underlined" onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" />
                    </div>
                    <div>
                        <Button color="#fff" variant="bordered" size="lg" onClick={() => handleLogin()}>Ingresar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login