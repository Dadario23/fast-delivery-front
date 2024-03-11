import axios, { AxiosResponse } from 'axios'
import { PackageData } from 'types/packageTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createPackage = async (packageData: PackageData) => {
	try {
		const response: AxiosResponse = await axios.post(
			`${API_URL}/api/packages`,
			{
				address: packageData.address,
				client: packageData.client,
				weight: packageData.weight,
				date: packageData.date ? packageData.date.toISOString() : null,
			},
			{ withCredentials: true }
		)
		return response.data
	} catch (error) {
		console.error('Error al crear el paquete:', error)
		throw error
	}
}

export const getAllPackages = async () => {
	try {
		const response: AxiosResponse = await axios.get(`${API_URL}/api/packages`, {
			withCredentials: true,
		})
		return response.data
	} catch (error) {
		console.error('Error al obtener los paquetes:', error)
		throw error
	}
}

export const assignPackageToUser = async (packageId: number) => {
	try {
		const response: AxiosResponse = await axios.put(
			`${API_URL}/api/packages/assign/${packageId}`,
			null,
			{ withCredentials: true }
		)
		return response.data
	} catch (error) {
		console.error('Error al asignar el paquete:', error)
		throw error
	}
}

export const removeUserFromPackage = async (packageId: number) => {
	try {
		const response = await axios.put(`${API_URL}/api/packages/removeUserId/${packageId}`, null, {withCredentials: true})
		return response.data 
	} catch (error) {
		console.error('Error al eliminar usuario del paquete:', error)
		throw error
	}
}

export const getUserPackages = async () => {
	try {
		const response: AxiosResponse = await axios.get(`${API_URL}/api/packages/userPackages`, {withCredentials: true})
		return response.data
	} catch (error) {
		console.error('Error al obtener los paquetes:', error)
		throw error
	}
}

export const updatePackageStatusToOngoing = async (packageId: number) => {
	try {
		const response: AxiosResponse = await axios.put(`${API_URL}/api/packages/updateToOngoing/${packageId}`, null, {withCredentials: true})
		return response.data 
	} catch (error) {
		console.error('Error al actualizar el estado del paquete:', error)
		throw error
	}
}

export const deletePackage = async (packageId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/packages/${packageId}`, {withCredentials: true});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPackageById = async (packageId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/packages/${packageId}`, {withCredentials: true});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePackageStatusToDelivered = async (packageId: number) => {
	try {
		const response: AxiosResponse = await axios.put(`${API_URL}/api/packages/updateToDelivered/${packageId}`, null, {withCredentials: true})
		return response.data 
	} catch (error) {
		console.error('Error al actualizar el estado del paquete:', error)
		throw error
	}
}

export const updatePackageStatusToCancelled = async (packageId: number) => {
	try {
		const response: AxiosResponse = await axios.put(`${API_URL}/api/packages/updateToCancelled/${packageId}`, null, {withCredentials: true})
		return response.data 
	} catch (error) {
		console.error('Error al actualizar el estado del paquete:', error)
		throw error
	}
}