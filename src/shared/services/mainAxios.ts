import axios from 'axios';
import useAuthStore from '~store/auth.store';

export const mainAxios = axios.create({
  withCredentials: true,
});

mainAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setAccessToken, logout } =
				useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post('/auth/token/refresh/', {
          refresh: refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } =
					response.data;

        setAccessToken(accessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return mainAxios(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
