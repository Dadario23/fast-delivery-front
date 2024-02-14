export interface UserRegister {
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  // urlphoto: string;
  isAdmin?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}