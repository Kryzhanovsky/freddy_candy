import React, { FC } from "react";
import { Navmenu } from '../navmenu/navmenu';

import logo from '../../assets/Freddys_Logo.svg'

import './sidebar.css';

interface SidebarProps {

}

export const Sidebar: FC<SidebarProps> = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="navmenu">
                <Navmenu />
            </div>
        </div>
    )
}
