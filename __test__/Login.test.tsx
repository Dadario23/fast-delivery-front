import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Login from '../src/components/Login'
import { loginUser } from '../src/services/dataAuth'
import { Provider } from 'react-redux'
import store from '../src/state/store'
import '@testing-library/jest-dom/extend-expect'
jest.mock('../src/services/dataAuth', () => ({
	loginUser: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			prefetch: () => null,
		}
	},
}))

describe('Login Component', () => {
	it('renders login form', () => {
		const { getByPlaceholderText, getByText } = render(
			<Provider store={store}>
				<Login logged={false} />
			</Provider>
		)
		expect(getByPlaceholderText('email@contraseña.com')).toBeInTheDocument()
		expect(getByPlaceholderText('*******')).toBeInTheDocument()
		expect(getByText('Ingresar')).toBeInTheDocument()
		expect(getByText('Crear cuenta')).toBeInTheDocument()
		expect(getByText('OLVIDÉ MI CONTRASEÑA')).toBeInTheDocument()
	})

	it('calls loginUser function on form submit', async () => {
		const { getByPlaceholderText, getByText } = render(
			<Provider store={store}>
				<Login logged={false} />
			</Provider>
		)

		const emailInput = getByPlaceholderText('email@contraseña.com')
		const passwordInput = getByPlaceholderText('*******')
		const submitButton = getByText('Ingresar')

		fireEvent.change(emailInput, { target: { value: 'test@fake.com' } })
		fireEvent.change(passwordInput, { target: { value: 'password' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(loginUser).toHaveBeenCalledWith('test@fake.com', 'password')

			expect(submitButton).toBeEnabled()
		})
	})
})
