import axios, { AxiosResponse } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const postAffidavit = async (declaration: object) => {
	try {
		const response: AxiosResponse = await axios.post(
			`${API_URL}/api/users/affidavit`,
			declaration,
			{
				withCredentials: true,
			}
		)
		return response.data
	} catch (error) {
		console.error('Error al obtener los usuarios:', error)
		throw error
	}
}
