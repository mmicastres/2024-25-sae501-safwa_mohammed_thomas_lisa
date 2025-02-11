// api.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Preferences } from '@capacitor/preferences';
import router from './router';

const api: AxiosInstance = axios.create({
    baseURL: 'https://test.nanodata.cloud/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function getAccessToken(): Promise<string | null> {
    const { value: accessToken } = await Preferences.get({ key: 'access_token' });
    return accessToken;
}

async function refreshAccessToken(): Promise<string> {
    const { value: refreshToken } = await Preferences.get({ key: 'refresh_token' });

    try {
        const response: AxiosResponse = await axios.post('https://test.nanodata.cloud/refresh_token', {
            refresh_token: refreshToken,
        });
        const newAccessToken: string = response.data.access_token;
        const newRefreshToken: string = response.data.refresh_token;

        await Preferences.set({ key: 'access_token', value: newAccessToken });
        if (newRefreshToken) {
            await Preferences.set({ key: 'refresh_token', value: newRefreshToken });
        }

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token', error);
        throw error;
    }
}

api.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = await getAccessToken();
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config as InternalAxiosRequestConfig;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Redirecting to login due to failed refresh');
                await Preferences.clear();
                router.push('/login');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);




export default api;
