"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user-icon.svg";
import { useRouter } from "next/navigation";
import { mailForgotPassword } from "services/dataAuth";

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      await mailForgotPassword(formData.email);
      alert("El correo electrónico ha sido enviado correctamente. Por favor, verifica tu bandeja de entrada.")
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
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
        <div className="absolute mb-4 top-[300px] left-[30px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Image src={userIcon} alt="user icon" width={14} height={14} />
          </span>
          <input
            type="text"
            className="w-[300px] h-[35px] border pl-[44px] rounded-[10px] border-[#fff] bg-transparent"
            placeholder="email@nuevacontraseña.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="absolute w-[270px] h-[30px] top-[400px] left-[45px]  border-white rounded-[13px] bg-[#00EA77] text-[#3D1DF3]"
        >
          Enviar
        </button>
        <p className=" absolute text-[12px] top-[350px]">Ingresá el email con el que estas registrado.</p>
        <p className=" absolute text-[12px] top-[370px]">Te enviaremos un correo para restablecer la contraseña.</p>
      </form>
    </>
  );
};

export default ForgotPassword;
