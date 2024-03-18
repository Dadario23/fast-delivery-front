import axios, { AxiosResponse } from "axios";
// import { UserData } from "../types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/api/users/`, {
      withCredentials: true,
    });
    //console.log("dataUsers en SErvices trae esto", response);
    return response.data;
  } catch (error) {
    //console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const getDataDeliverys = async (date: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/api/users/stats/delivery`,
      { date }, // Envía los datos en el cuerpo de la solicitud
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
    const response: AxiosResponse = await axios.put("/api/users/update", null);
    console.log("updateUsers---->", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const getUserProfileImage = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      // `${API_URL}/api/packages/userPackages/${id}`
      `http://localhost:3001/api/users/profile-image`
      // { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    //console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};
