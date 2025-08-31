import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import './Logout.css';

export const Logout = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
        localStorage.clear();
    }, [logout])
    return (
        <h2 className='logoutText'>User logged out successfully</h2>
    )
}
