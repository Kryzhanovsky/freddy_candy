import React, { FC, useContext } from "react";

import './dashboard.css';
import { APIContext } from "../../context/APIContext";

export const Dashboard: FC<{}> = () => {
    const fetch = useContext(APIContext);

    console.log('fetch', fetch)
    return (
        <div className="dashboard">
            dashboard
        </div>
    )
}
