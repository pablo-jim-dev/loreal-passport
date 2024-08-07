import React from 'react'
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Model from '../assets/images/model.png'

const Menu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <div className='flex flex-col flex-1 justify-start h-[90vh] w-full'>
            <img src={Model} alt="Model" className='w-full h-auto border-b-large border-[#403E47]' />
            <div className='flex flex-1 flex-col justify-around w-full gap-1 p-5'>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <Button className='shadow-xl bg-[#403E47] text-white' color="default" variant="flat" size="lg" onClick={() => navigate("/scanner")}>Escanear accesos</Button>
                    <Button className='shadow-xl' color="default" variant="flat" size='lg' onClick={() => navigate("/list")}>Consultar lista de invitados</Button>
                </div>
                <Button className='' color="default" variant="bordered" size='lg' onClick={() => handleLogout()}>Cerrar sesión</Button>
            </div>
        </div>
    )
}

export default Menu