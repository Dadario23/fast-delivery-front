"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user-icon.svg";
import passIcon from "../assets/pass-icon.svg";
import eyeCrossedIcon from "../assets/eye-crossed-icon.svg";
import { useRouter } from "next/navigation";
import eyeIcon from "../assets/eye-icon.svg";
import { loginUser } from "services/dataAuth";
import { UserState } from "types/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<{ logged: boolean }> = ({ logged }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const user: UserState = useSelector<RootState, UserState>(
    (state) => state.user
  );
  useEffect(() => {
    if (user && user.id != -1) {
      if (user.isAdmin) router.push("/manage-orders");
      else router.push("/home");
    } else setLoading(false);
  }, [user]);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      if (!response.isAdmin) {
        router.push("/home");
      } else {
        router.push("/manage-orders");
      }
      toast.success("Inicio de sesión exitoso!");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error("Email o contraseña incorrectos");
    }
  };

  if (loading)
    return (
      <div className="flex w-[100%] h-[100vh] items-center justify-center">
        <div className="flex flex-row rounded-2xl p-4 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      </div>
    );

  return (
    <>
      <Image
        src={logo}
        alt="logo"
        width={250}
        height={117}
        className="absolute top-[122px] left-[55px]"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center relative"
      >
        <div className="absolute mb-4 top-[289px] left-[30px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Image src={userIcon} alt="user icon" width={14} height={14} />
          </span>
          <input
            type="text"
            className="w-[300px] h-[35px] border pl-[44px] rounded-[10px] border-[#fff] bg-transparent"
            placeholder="email@contraseña.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="absolute mb-4 top-[334px] left-[30px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Image src={passIcon} alt="pass icon" width={14} height={16} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="w-[300px] h-[35px] border pl-[44px] rounded-[10px] border-[#fff] bg-transparent"
            placeholder="*******"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Image
              src={showPassword ? eyeIcon : eyeCrossedIcon}
              alt="eye icon"
              width={20}
              height={20}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            />
          </span>
        </div>

        <button
          type="submit"
          className="absolute w-[270px] h-[30px] top-[404px] left-[45px]  border-white rounded-[13px] bg-[#00EA77] text-[#3D1DF3]"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="absolute w-[270px] h-[30px] top-[449px] left-[45px]  border border-white rounded-[13px] bg-transparent"
          onClick={() => router.push("/register")}
        >
          Crear cuenta
        </button>
        <p
          className="absolute w-[137px] top-[498px] left-[111px] font-light text-xs whitespace-nowrap"
          onClick={() => router.push("/forgot-password")}
        >
          OLVIDÉ MI CONTRASEÑA
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
