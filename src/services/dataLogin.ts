import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const checkAuth = async (user: any, router: any, dispatch: any): Promise<any> => {
//   try {
//     const response: AxiosResponse = await axios.get(`${API_URL}/users/me`, {
//       withCredentials: true,
//     });
//     const userData = response.data;
//     return userData;
//   } catch (error) {
//     console.error("Error al verificar la autenticación:", error);
//   }
// };

export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export const getPrivateData = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/users/private`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
