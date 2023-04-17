import React, { ReactNode, useRef } from 'react';
import Cookies from 'js-cookie';

export const APIContext = React.createContext<(pathname: string, options?: RequestInit) => any>(() => {});

interface APIContextProviderProps {
    children: ReactNode;
    endpoint: string;
}

const fetchAPI = (endpoint: string) => async (pathname: string, options?: RequestInit ) => {
    const url = endpoint + pathname;
    const response = await fetch(url, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('access_token')}`,
    }, ...options ?? {}});

    return response.json()
}

export const APIContextProvider = ({endpoint, children}: APIContextProviderProps ) => {
    const fetch = useRef(fetchAPI(endpoint));

    return (
        <APIContext.Provider value={fetch?.current}>
            {children}
        </APIContext.Provider>
    )
}
