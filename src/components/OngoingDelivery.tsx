"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import BackIcon from "assets/BackIcon/back-icon";
import Map from "assets/map";
import { useRouter } from "next/navigation";
const RepartoEnCurso: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-wrap  rounded-xl mx-[30px] mt-[25px] mb-20 bg-[#C7FFB1] relative ">
      <div className="w-full h-[50px] pl-0 flex items-center rounded-t-xl  z-10  font-bold ">
        <div className="ml-3" onClick={() => router.back()}>
          <BackIcon />
        </div>
        <div className="title text-[#3d1df3] text-[16px] font-[700px] mr-10 flex-grow text-center leading-[1px]">
          Reparto en curso
        </div>
      </div>
      <div className="bg-white rounded-xl z-20 text-[#3d1df3] text-[12px] w-[19rem] pl-4">
        <div className="mt-4 border border-[#3d1df3] rounded-md w-[273px]">
          <Map />
        </div>
        <div className="flex  flex-col justify-items-start mt-4">
          <h3>
            <span className="font-extrabold ">Destino:</span> Amenábar 2100,
            CABA
          </h3>
          <h3>
            {" "}
            <span className="font-extrabold ">Número de paquete: </span>#0A235
          </h3>
          <h3>
            {" "}
            <span className="font-extrabold ">Recibe:</span> David Rodriguez
          </h3>
        </div>
        <button
          className="w-[270px] h-[30px] text-[14px] mt-6 mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center "
          onClick={() => router.push("/home-swd")}
        >
          Finalizar
        </button>
      </div>
      <button className="w-[270px] h-7 text-[14px] text-white border border-[#00ea77] bg-transparent rounded-[13px] absolute mt-[555px]">
        Cancelar entrega
      </button>
    </div>
  );
};

export default RepartoEnCurso;
