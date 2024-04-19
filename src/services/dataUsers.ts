import axios, { AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/api/users/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataDeliverys = async (date: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/api/users/stats/delivery`,
      { date },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async () => {
  try {
    const response: AxiosResponse = await axios.put(
      `${API_URL}/api/users/update`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast("Intente nuevamente en 12hs");

    throw error;
  }
};

export const getUserProfileImage = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${API_URL}/api/users/profile-image`
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};
