import axios, { AxiosResponse } from 'axios'
// import { UserData } from "../types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const authAxios = axios.create({
	//
	baseURL: API_URL,
	withCredentials: true,
})

export const getUser = async () => {
	try {
		const response: AxiosResponse = await authAxios.get('/api/users/')
		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}

export const updateUser = async () => {
	try {
		const response: AxiosResponse = await authAxios.put(
			'/api/users/update',
			null
		)
		console.log('updateUsers---->', response)
		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}
