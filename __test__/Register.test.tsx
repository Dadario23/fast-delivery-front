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

	// it("should make axios request when submit button is clicked", async () => {
	//   //  NO HAY MANERA DE FALSEAR EL INGRESO DE UNA FOTO. SIN LA FOTO, EL TEST FUNCIONA
	//   jest.mock("../src/services/dataAuth", () => ({
	//     registerUser: jest.fn(),
	//   }));

	//   const { getByPlaceholderText, getByText } = render(<CreateAccountForm />);

	//   fireEvent.change(getByPlaceholderText("Nombre"), {
	//     target: { value: "Jose" },
	//   });
	//   fireEvent.change(getByPlaceholderText("Apellido"), {
	//     target: { value: "Larralde" },
	//   });
	//   fireEvent.change(getByPlaceholderText("Email@contraseña"), {
	//     target: { value: "jose@larralde.com" },
	//   });
	//   fireEvent.change(getByPlaceholderText("Contraseña"), {
	//     target: { value: "Password1234" },
	//   });
	//   fireEvent.change(getByPlaceholderText("Confirmar contraseña"), {
	//     target: { value: "Password1234" },
	//   });

	//   fireEvent.click(getByText("Crear"));

	//   await waitFor(() => {
	//     expect(registerUser).toHaveBeenCalledWith({
	//       nombre: "Jose",
	//       apellido: "Larralde",
	//       email: "jose@larralde.com",
	//       contraseña: "Password1234",
	//       confirmarContraseña: "Password1234",

	//     });
	//     expect(registerUser).toHaveBeenCalled();
	//   });
	// });
})
