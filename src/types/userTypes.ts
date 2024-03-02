export interface UserRegister {
	nombre: string;
	apellido: string;
	email: string;
	contraseña: string;
	//photo: string;
	isAdmin?: boolean;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserData {
	id: number;
	name: string;
	surname: string;
	email: string;
	isAdmin?: boolean;
	isDisabled?: boolean;
}
