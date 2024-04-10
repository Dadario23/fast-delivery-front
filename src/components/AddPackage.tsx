"use client";
import React, { ChangeEvent, useState } from "react";
import BackIcon from "assets/BackIcon/back-icon";
import { TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { createPackage } from "services/dataPackages";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const AddPackage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);

  const [data, setData] = useState({
    direccion: "",
    nombreDeQuienRecibe: "",
    pesoDelPaquete: 0,
    fecha: null,
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate) {
      toast("Por favor, selecciona una fecha");
      return;
    }
    try {
      const packageData = {
        address: data.direccion,
        client: data.nombreDeQuienRecibe,
        weight: data.pesoDelPaquete,
        date: startDate,
      };
      await createPackage(packageData);
      toast.success("Paquete agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el paquete:", error);
      toast.error("Error al agregar el paquete");
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative">
      <div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1]">
        <div className="ml-3" onClick={() => router.back()}>
          <BackIcon />
        </div>
        <h2 className="text-[#3d1df3] mr-10 flex-grow text-center">
          Agregar paquetes
        </h2>
      </div>
      <div className="bg-white rounded-xl z-20 text-[85%] w-[19rem] pt-[7rem]">
        <form className="text-[#3d1df3] pl-4" onSubmit={handleSubmit}>
          <input
            name="direccion"
            type="text"
            placeholder="Dirección"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none"
            value={data.direccion}
            onChange={handleChanges}
          />
          <input
            name="nombreDeQuienRecibe"
            type="text"
            placeholder="Nombre de quien recibe"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none"
            value={data.nombreDeQuienRecibe}
            onChange={handleChanges}
          />
          <input
            name="pesoDelPaquete"
            type="number"
            placeholder="Peso del paquete (Kg)"
            className="w-[270px] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none"
            value={data.pesoDelPaquete}
            onChange={handleChanges}
          />
          <div className="border-t border-dotted border-[#3d1df3] text-[#3d1df3] w-[270px] mt-[15px] relative z-[1]">
            <h3 className="mt-2 mb-2">Fecha de entrega</h3>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="00/00/00"
            minDate={new Date()}
            className="w-[270px] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none relative left z-20"
          />
          <div className="h-[9px] w-[13px] absolute right-6 top-[367px] transform -translate-y-1/2 cursor-pointer z-50">
            <TiArrowSortedDown />
          </div>
          <button className="w-[270px] h-[30px] text-[14px] mt-[100px] mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center hover:bg-white hover:border border-[#00ea77]">
            Agregar
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPackage;
