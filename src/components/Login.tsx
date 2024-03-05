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

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<{ logged: boolean }> = ({ logged }) => {
  useEffect(() => {
    if (logged) router.push("/home-swd");
  });
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
      console.log(response);
      router.push("/home-swd");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

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
        <p className="absolute w-[137px] top-[498px] left-[111px] font-light text-xs whitespace-nowrap">
          OLVIDÉ MI CONTRASEÑA
        </p>
      </form>
    </>
  );
};

export default Login;
