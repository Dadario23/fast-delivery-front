"use client";
import React from "react";
import BackIcon from "assets/BackIcon/back-icon";
import Check from "assets/Check/check";
import "tailwindcss/tailwind.css";
import { useState } from "react";

const packages = [
  {
    title: "Amenabar 2100,",
    location: "CABA",
  },
  {
    title: "Av Carabobo y Rivadavia,",
    location: "CABA",
  },
  {
    title: "Melian 1242,",
    location: "CABA",
  },
  {
    title: "Castillo 670,",
    location: "CABA",
  },
  {
    title: "Gorriti 4595,",
    location: "CABA",
  },
  {
    title: "Av. Gral. Mosconi 1056,",
    location: "CABA",
  },
  {
    title: "Tacuari 1797,",
    location: "CABA",
  },
];

const PackagesSelection: React.FC = () => {
  const [selectedPackages, setSelectedPackages] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((selectedIndex) => selectedIndex !== index)
        : [...prevSelected, index]
    );
  };

  return (
    <div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] bg-[#C7FFB1] mt-[20px] h-[74px] relative ">
      <div className="w-full h-[55px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
        <div className="ml-3">
          <BackIcon />
        </div>
        <h2 className=" font-bold text-[#3d1df3] mr-10 flex-grow text-center">
          Obtener paquetes
        </h2>
      </div>
      <div className="bg-white rounded-xl w-[300px] h-[452px] z-20">
        <h1 className="text-[#3d1df3] text-center text-[12px] mt-2 mb-2">
          ¿Cuántos paquetes repartirás hoy?
        </h1>
        <hr className="border-t border-[#3d1df3] mb-4 w-[270px] h-[0.5px] ml-4" />
        {packages.map((packageItem, index) => (
          <div
            className="relative border border-[#3d1df3] h-[46px] w-[270px] ml-[15px] mb-[10px] rounded-[10px]"
            key={index}
          >
            <div
              className="absolute border-[1px] border-[#3d1df3] w-[16px] h-[16px] rounded-[5px] ml-[10px] mt-[14px] "
              onClick={() => handleClick(index)}
            >
              {selectedPackages.includes(index) && (
                <div className="ml-[-1px] mt-[-1px]">
                  <Check />
                </div>
              )}
            </div>
            <div className="text-[#3d1df3] text-[12px] ml-[50px] mt-[9px]">
              {packageItem.title}
            </div>
            <div className="text-[#3d1df3] text-[12px] ml-[50px] mt-[-2px]">
              {packageItem.location}
              </div>
            <div className="bg-[#3d1df3] absolute w-[1px] h-[70%] left-[37px] top-[0.5rem]"></div>
          </div>
        ))}
      </div>
      <button className="bg-[#00ea77] text-[14px] text-[#3d1df3] rounded-[15px] h-[30px] w-[16.5rem] mt-[10px]">
        Iniciar jornada
      </button>
    </div>
  );
};

export default PackagesSelection;






