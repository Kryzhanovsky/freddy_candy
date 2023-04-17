import React, { FC, createContext, useState, useContext, ReactNode, useMemo } from 'react';
import Cookies from 'js-cookie';

import { IUserRsponse } from '../api/api';

interface IUserSessionContext {
    setUserSession: (user: IUserRsponse) => void
    killUserSession: () => void
    getUserSession: () => IUserRsponse | null | undefined
}

const UserSessionContext = createContext<IUserSessionContext | null>(null);

interface UserSessionProviderProps {
    children: ReactNode;
}

const accessToken = Cookies.get('access_token');
const refreshToken =  Cookies.get('refresh_token');

const initialUser: IUserRsponse | null = (accessToken && refreshToken) ? {
    'access_token': accessToken,
    'refresh_token': refreshToken,
} : null;

export const UserSessionProvider = ({children}: UserSessionProviderProps) => {
    const [user, setUser] = useState<IUserRsponse | null>(initialUser);

    const setUserSession = (user: IUserRsponse) => {
        setUser(user);
    }

    const killUserSession = () => {
        setUser(null);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    }

    const getUserSession = () => {
        return user;
    }

    const userSessionData = useMemo(() => {
        return { setUserSession, killUserSession, getUserSession }
    }, [user]);

    return <UserSessionContext.Provider value={userSessionData}>
        {children}
    </UserSessionContext.Provider>
}

export const useUserSessionContext = () => {
    return useContext(UserSessionContext);
}
