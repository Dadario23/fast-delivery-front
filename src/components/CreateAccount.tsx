"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Eye, { EyeBlocked } from "../assets/Eye/eye";
import CameraIcon from "assets/CameraIcon/camera-icon";
import BackIcon from "assets/BackIcon/back-icon";
import { useRouter } from "next/navigation";

const CreateAccountForm: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<Boolean>(false);
  const [visible2, setVisible2] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);

  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [passChecker, setPassChecker] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    lenght: false,
    validation: false,
  });

  const handleVisibleClick = (e: any) => {
    setVisible(!visible);
  };
  const handleVisibleClick2 = (e: any) => {
    setVisible2(!visible2);
  };
  const handleChanges = (e: any) => {
    const { name, value } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleInputPassword = (e: any) => {
    const inputValue = e.target.value;

    setData({ ...data, contraseña: inputValue });
    setPassChecker({
      uppercaseLetter: /[A-ZÑ]/.test(inputValue),
      lowercaseLetter: /[a-zñ]/.test(inputValue),
      oneNumber: /\d/.test(inputValue),
      lenght: inputValue.length >= 8,
      validation:
        /[A-ZÑ]/.test(inputValue) &&
        /[a-zñ]/.test(inputValue) &&
        /\d/.test(inputValue) &&
        inputValue.length >= 8,
    });
    if (Object.values(passChecker).includes(false)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  function handleSubmit(e: any) {
    e.preventDefault();
    if (data.confirmarContraseña && !passChecker.validation) {
      alert(
        "Revise que la contraseña contenga al menos un número, una letra mayúscula, una minúscula y que tenga al menos 8 caracteres "
      );

      return;
    } else if (data.confirmarContraseña !== data.contraseña) {
      alert("LAS CONTRASEÑAS NO COINCIDEN");
      return;
    } else if (Object.values(data).includes("")) {
      alert("HAY CAMPOS VACÍOS QUE ES NECESARIO COMPLETAR");
      return;
    }
    router.push("/home-swd");
  }
  return (
    <div className="flex items-center justify-center flex-wrap  rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative ">
      <div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
        <div className="ml-3" onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h2
          className="text-[#3d1df3] mr-10 flex-grow text-center"
          onClick={() => router.push("/login")}
        >
          Creá tu cuenta
        </h2>
      </div>
      <div className="bg-white rounded-xl z-20 text-[85%] w-[19rem]">
        <form className=" pl-4 text-[#3d1df3]" onSubmit={handleSubmit}>
          <div className="w-[95px] h-[95px] mb-4 mt-5 ml-[88px] flex items-center justify-center border border-[#3d1df3] rounded-full">
            <CameraIcon />
          </div>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            className={`w-[270px] mb-2 p-2 pl-4 border border-[#654ede] rounded-xl placeholder-[#3d1df3] focus:outline-none `}
            value={data.nombre}
            onChange={handleChanges}
          />
          <input
            name="apellido"
            type="text"
            placeholder="Apellido"
            className={`w-[270px] mb-2 p-2 pl-4 border border-[#654ede] rounded-xl placeholder-[#3d1df3] focus:outline-none `}
            value={data.apellido}
            onChange={handleChanges}
          />
          <input
            name="email"
            type="email"
            placeholder="Email@contraseña"
            className={`w-[270px] mb-2 p-2 pl-4 border border-[#654ede] rounded-xl placeholder-[#3d1df3] focus:outline-none `}
            value={data.email}
            onChange={handleChanges}
          />
          <div className="relative items-center">
            <input
              name="contraseña"
              placeholder="Contraseña"
              className={`w-[270px] mb-2 p-2 pl-4 border ${
                error ? "border-[#ff0000]" : "border-[#654ede]"
              } rounded-xl placeholder-[#3d1df3] focus:outline-none `}
              value={data.contraseña}
              onChange={handleInputPassword}
              type={visible ? "text" : "password"}
            />
            <div
              className="absolute right-7 top-2"
              onClick={handleVisibleClick}
            >
              {visible ? <Eye /> : <EyeBlocked />}
            </div>
          </div>
          <div className="relative">
            <input
              name="confirmarContraseña"
              type={visible2 ? "text" : "password"}
              placeholder="Confirmar contraseña"
              className={`w-[270px] mb-2 p-2 pl-4 border border-[#654ede]
              rounded-xl placeholder-[#3d1df3] focus:outline-none `}
              value={data.confirmarContraseña}
              onChange={handleChanges}
            />
            <div
              className="absolute right-7 top-2"
              onClick={handleVisibleClick2}
            >
              {visible2 ? <Eye /> : <EyeBlocked />}
            </div>
          </div>
          <button className="w-[270px] h-[30px] mt-4 mb-2 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center hover:bg-white hover:border border-[#00ea77]">
            Crear
          </button>
          <h2 className="mb-2 flex items-center justify-center text-[#3d1df3] text-[12px]">
            ¿Ya tenés una cuenta?
          </h2>
          <button
            className="w-[270px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3]  rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
            onClick={() => router.push("/login")}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
