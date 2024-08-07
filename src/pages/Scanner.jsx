import React from 'react'
import { Scanner as ScannerComponent } from '../components/Scanner'
import { Button } from "@nextui-org/react";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Scanner = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <div className='flex flex-col flex-1 justify-start h-screen w-full'>
            <div className='w-screen mt-20'>
                <ScannerComponent />
                <div className='flex h-10 w-full bg-[#34333a]'></div>
            </div>
            <div className='flex flex-1 flex-col justify-around items-center w-full gap-3 p-5'>
                <Button className='box shadow-xl' color="default" variant="flat" size="lg" onClick={() => navigate("/list")}>Consultar lista de invitados</Button>
                <Button className='w-48' color="default" variant="bordered" size='lg' onClick={() => handleLogout()}>Cerrar sesión</Button>
            </div>
        </div>
    )
}

export default Scanner