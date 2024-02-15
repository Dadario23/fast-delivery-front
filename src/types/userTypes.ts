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