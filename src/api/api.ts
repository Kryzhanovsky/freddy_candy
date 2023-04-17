import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const endpoint: string = 'https://freddy.codesubmit.io';

interface ILoginCredentials {
    username: string 
    password: string
}

interface IApiService {
    apiFetch: (pathname: string, options?: RequestInit) => Promise<any>
    login: ({username, password}: ILoginCredentials) => Promise<any>
    getOrders: () => Promise<any>
    apiRefreshUserToken: () => Promise<any>
}

interface IDecodedAccessToken {
    iat: number
    nbf: number
    jti: string
    exp: number
    identity: string
    fresh: boolean
    type: string
  }

export interface IUserRsponse {
    'access_token': string,
    'refresh_token': string,
}

export enum USER_LOGIN_STATUS {
    'SUCCESS',
    'BAD_CREDENTIALS',
}

export class ApiService {
    private static instance: IApiService;

    public static getInstance(): IApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }

    public apiFetch = async (pathname: string, options?: RequestInit) => {
        const url = endpoint + pathname;
        const response = await fetch(url, {headers: {
            'Content-Type': 'application/json',
            ...options?.headers ?? {},
        }, ...options ?? {}});
    
        return response;
    }

    public apiRefreshUserToken = async () => {
        const refreshToken = Cookies.get('refresh_token');

        const response = await this.apiFetch('/refresh', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        })

        const responseData = await response.json();
        const { access_token } = responseData;

        Cookies.set('access_token', responseData.access_token)

        return access_token;
    }

    public apiFetchAutorized = async (
        pathname: string, 
        method: string, 
        options?: RequestInit
    ) => {
        let accessToken = Cookies.get('access_token');
        let isAccessExpire = false;
        const refreshToken = Cookies.get('refresh_token');

        if (accessToken) {
            const decodedAccessToken = jwt_decode<IDecodedAccessToken>(accessToken);
            isAccessExpire = Date.now() > decodedAccessToken?.exp * 1000;
        }

        if (!accessToken || isAccessExpire) {
            accessToken = await this.apiRefreshUserToken();
        }

        const response = await this.apiFetch(pathname, {
            method: method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...options?.headers ?? {},
            }, ...options ?? {}
        })

        return response;
    }

    public login = async ({username, password}: ILoginCredentials): Promise<{
        status: USER_LOGIN_STATUS,
        data: IUserRsponse,
    }> => {
        const response = await this.apiFetch('/login', {
            body: JSON.stringify({
                username: username, 
                password: password,
            }),
            method: 'POST'
        });

        const responseData = await response.json();

        if (response.status === 200) {
            const { access_token, refresh_token } = responseData;

            access_token && Cookies.set('access_token', access_token);
            refresh_token && Cookies.set('refresh_token', refresh_token);
        
            return {
                status: USER_LOGIN_STATUS.SUCCESS,
                data: responseData,
            }
        } else if (response.status === 401) {
            return {
                status: USER_LOGIN_STATUS.BAD_CREDENTIALS,
                data: responseData,
            };
        } else {
            throw new Error(responseData);
        }
    }

    public getOrders = async (): Promise<any> => {
        const response = await this.apiFetchAutorized('/orders?page=1&', 'GET');

        return response.json();
    }
}
