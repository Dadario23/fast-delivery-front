import axios, { AxiosResponse } from 'axios';
import { PackageData } from 'types/packageTypes';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createPackage = async (packageData: PackageData) => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/api/packages`, {
      address: packageData.direccion,
      owner: packageData.nombreDeQuienRecibe,
      weight : packageData.pesoDelPaquete,
      date: packageData.fecha ? packageData.fecha.toISOString() : null, 
    }, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error al crear el paquete:', error);
    throw error;
  }
};