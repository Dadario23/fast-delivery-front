import axios, { AxiosResponse } from 'axios'
// import { UserData } from "../types/userTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getUser = async () => {
	try {
		const response: AxiosResponse = await axios.get(`${API_URL}/api/users/`, {
			withCredentials: true,
		})
		console.log('dataUsers en SErvices trae esto', response)
		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}
