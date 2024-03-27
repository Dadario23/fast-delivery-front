import { render, screen } from '@testing-library/react'
import CreateAccountForm from '../src/components/CreateAccount'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			prefetch: () => null,
		}
	},
}))
jest.mock('../src/services/dataAuth', () => ({
	registerUser: jest.fn(),
}))
jest.mock('axios', () => ({
	create: () => ({
		post: jest.fn(),
	}),
}))

const mockAlert = jest.fn()
global.alert = mockAlert

describe('CreateAccountForm', () => {
	it('renders all input fields', () => {
		render(<CreateAccountForm />)

		expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Apellido')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Email@contraseña')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
		expect(
			screen.getByPlaceholderText('Confirmar contraseña')
		).toBeInTheDocument()
	})
})
