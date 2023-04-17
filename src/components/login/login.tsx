import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiService, USER_LOGIN_STATUS } from '../../api/api';
import { useUserSessionContext } from '../../context/UserSessionContext';

import logo from '../../assets/Freddys_Logo.svg';

import './login.css';

export const Login: FC<{}> = () => {
    const api = ApiService.getInstance();
    const userSession = useUserSessionContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (userSession?.getUserSession()) {
            navigate('/');
        }
    }, [userSession]);

    const onLigin = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await api.login({
                username: username, 
                password: password,
            })
            
            if (response.status === USER_LOGIN_STATUS.SUCCESS) {
                userSession?.setUserSession(response.data);
            } else if (response.status === USER_LOGIN_STATUS.BAD_CREDENTIALS) {
                response.data.msg && setMessage(response.data.msg);
            }
        } catch (error) {
            console.error(error);
            setMessage('Server error');
        }
    }

    return (
        <div className="login">
            <div className="login-box">
                <div className="login-title">
                    <h1>
                        Freddy's Artisanal Halloween Candy Shop
                    </h1>
                    <img className="login-logo" src={logo} alt="Logo" />
                </div>
                <form className="login-form" onSubmit={onLigin}>
                    {message && <div className="login-message">
                        {message}
                    </div>}
                    <input 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        type="text" 
                        placeholder="Username" 
                    />
                    <input 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Password"/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}





// const fetch = useContext(APIContext);

// const onLoginClick = async () => {
//     const response = await fetch('/login', {
//         body: JSON.stringify({
//             username: 'freddy', password: 'ElmStreet2019'
//         }),
//         method: 'POST'
//     })
//     console.log(response)

//     Cookies.set('access_token', response.access_token, {
//         expires: new Date(new Date().getTime() + 15 * 60 * 1000)
//     });
//     Cookies.set('refresh_token', response.refresh_token);
// }
