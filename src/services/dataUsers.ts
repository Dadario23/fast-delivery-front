import axios, { AxiosResponse } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getUserById = async (userId: number) => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error; 
  }
};