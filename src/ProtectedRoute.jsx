import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth();

    if(loading) return <h2 className='text-white'>Loading</h2>
    if (!loading && !isAuthenticated) return <Navigate to={'/'} replace />
 
    return <Outlet/>
}

export default ProtectedRoute