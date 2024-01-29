"use client";
import React from "react";
import BackIcon from "assets/BackIcon/back-icon";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/navigation";

const AddPackage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-wrap  rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative ">
      <div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1]">
        <div className="ml-3" onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h2 className="text-[#3d1df3] mr-10 flex-grow text-center">
          Agregar paquetes
        </h2>
      </div>
      <div className="bg-white rounded-xl z-20 text-[85%] w-[19rem] pt-[7rem]">
        <form className=" pl-4">
          {" "}
          <input
            type="text"
            placeholder="Dirección"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
          />
          <input
            type="text"
            placeholder="Nombre de quien recibe"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
          />
          <input
            type="text"
            placeholder="Peso del paquete"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
          />
          <div className="border-t border-dotted border-[#3d1df3] text-[#3d1df3] w-[270px] mt-[15px] relative z-[1]">
            <h3 className="mt-2 mb-2">Fecha de entrega</h3>
            <input
              type="text"
              placeholder="00/00/00"
              className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
            />
            <div className="h-[9px] w-[13px] absolute right-4 top-12">
              <TiArrowSortedDown />{" "}
            </div>
          </div>
          <button className="w-[270px] h-[30px] text-[14px] mt-[100px] mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center ">
            Agregar
          </button>
        </form>{" "}
      </div>
    </div>
  );
};

export default AddPackage;
