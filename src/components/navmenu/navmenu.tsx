import React, { FC } from "react";
import { Link } from 'react-router-dom';
import { useUserSessionContext } from '../../context/UserSessionContext';

import './navmenu.css';

export const Navmenu: FC<{}> = () => {

    const userSession = useUserSessionContext();
    
    const onLogout = () => {
        userSession?.killUserSession();
    }

    return (
        <div className="navmenu">
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li onClick={onLogout}>Logout</li>
            </ul>
        </div>
    )
}
