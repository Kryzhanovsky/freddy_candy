import React, { FC, useContext, useEffect } from 'react';

import { ApiService } from '../../api/api';

import './orders.css';

export const Orders: FC<{}> = () => {
    const api = ApiService.getInstance();

    const getOrders = async () => {
        // const response = await api.getOrders();
        const response = await api.getOrders();
        
        console.log(response);
    }

    useEffect(() => {
        getOrders();
    })

    return (
        <div className="orders">
            Orders
        </div>
    )
}
