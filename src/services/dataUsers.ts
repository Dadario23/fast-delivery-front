import axios, { AxiosResponse } from 'axios'
// import { UserData } from "../types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getUser = async () => {
	try {
		const response: AxiosResponse = await axios.get(`${API_URL}/api/users/`, {
			withCredentials: true,
		})

		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}

export const updateUser = async () => {
	try {
		const response: AxiosResponse = await axios.put(
			`${API_URL}/api/users/update`,
			{
				withCredentials: true,
			}
		)
		console.log('updateUsers---->', response)
		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}
