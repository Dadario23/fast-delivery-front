export interface UserRegister {
	nombre: string;
	apellido: string;
	email: string;
	contraseña: string;
	foto: string;
	isAdmin?: boolean;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserState {
	id: number;
	email: string;
	isAdmin: boolean;
	name: string;
	surname: string;
	isDisabled: boolean;
	profileImage: string;
}
