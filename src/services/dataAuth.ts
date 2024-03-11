import axios, { AxiosResponse } from "axios";
import { UserLogin, UserRegister } from "types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkAuth = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/api/users/me`, {
      withCredentials: true,
    });
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
  }
};

export const registerUser = async (userData: UserRegister) => {
  try {
    await axios.post(
      "http://localhost:3001/api/users/register",
      {
        name: userData.nombre,
        surname: userData.apellido,
        email: userData.email,
        password: userData.contraseña,
        isAdmin: false,
      },
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserLogin> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dataLogout = async (): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const mailForgotPassword = async (email: string) => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/api/users/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const mailResetPassword = async (token: string, newPassword: string) => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/api/users/reset-password`, {
      token,
      newPassword,
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};