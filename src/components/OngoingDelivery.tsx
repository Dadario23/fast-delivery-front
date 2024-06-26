"use client";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import BackIcon from "assets/BackIcon/back-icon";
import Map from "assets/map";
import { useRouter } from "next/navigation";
import { getPackageById } from "services/dataPackages";
import {
  updatePackageStatusToOngoing,
  assignPackageToUser,
  updatePackageStatusToDelivered,
  updatePackageStatusToCancelled,
} from "services/dataPackages";
import { toast, ToastContainer } from "react-toastify";

interface Package {
  id: number;
  address: string;
  status: string;
  client: string;
  trackId: string;
  userId: number | null;
}

const RepartoEnCurso: React.FC = () => {
  const [packageInfo, setPackageInfo] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const router = useRouter();

  const handleStartPackage = async (packageId: number) => {
    try {
      await updatePackageStatusToOngoing(packageId);
      if (packageInfo?.userId === null) {
        await assignPackageToUser(packageId);
      }
      const updatedPackages = packages.map((packageItem) =>
        packageItem.id === packageId
          ? { ...packageItem, status: "EN CURSO" }
          : packageItem
      );
      setPackages(updatedPackages);
      setPackageInfo((prevPackageInfo) =>
        prevPackageInfo ? { ...prevPackageInfo, status: "EN CURSO" } : null
      );
      localStorage.setItem("currentPackageId", packageId.toString());
      router.push("/affidavit");
    } catch (error) {
      console.error("Error al iniciar el paquete:", error);
    }
  };

  const handleCompleteDelivery = async (packageId: number) => {
    try {
      await updatePackageStatusToDelivered(packageId);
      setPackageInfo((prevPackageInfo) =>
        prevPackageInfo ? { ...prevPackageInfo, status: "ENTREGADO" } : null
      );
      toast.success("Paquete entregado correctamente");
      router.back();
    } catch (error) {
      console.error("Error al completar la entrega del paquete:", error);
      toast.error("Error al completar la entrega del paquete");
    }
  };

  const handleCancelDelivery = async (packageId: number) => {
    try {
      await updatePackageStatusToCancelled(packageId);
      setPackageInfo((prevPackageInfo) =>
        prevPackageInfo ? { ...prevPackageInfo, status: "CANCELADO" } : null
      );
      toast.success("Paquete eliminado correctamente");
      router.back();
    } catch (error) {
      console.error("Error al cancelar la entrega del paquete:", error);
      toast.error("Error al cancelar la entrega del paquete");
    }
  };

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const packageId = window.location.pathname.split("/").pop();
        if (packageId) {
          const packageData = await getPackageById(
            parseInt(packageId as string)
          );
          setPackageInfo(packageData);
        }
      } catch (error) {
        console.error("Error al obtener los detalles del paquete:", error);
      }
    };
    fetchPackageDetails();
  }, []);

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
            <span className="font-extrabold ">Destino:</span> {""}
            {packageInfo?.address}
          </h3>
          <h3>
            {" "}
            <span className="font-extrabold ">Número de paquete: </span>
            {packageInfo?.trackId}
          </h3>
          <h3>
            {" "}
            <span className="font-extrabold ">Recibe:</span>{" "}
            {packageInfo?.client}
          </h3>
        </div>
        {packageInfo && packageInfo.status === "CANCELADO" ? (
          <p className="text-[#FF0000] text-center mt-6 mb-4">Cancelado</p>
        ) : (
          <button
            className="w-[270px] h-[30px] text-[14px] mt-6 mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center "
            onClick={() => {
              if (packageInfo && packageInfo.status === "EN CURSO") {
                handleCompleteDelivery(packageInfo.id);
              } else if (packageInfo && packageInfo.status === "PENDIENTE") {
                handleStartPackage(packageInfo.id);
              }
            }}
          >
            {packageInfo && packageInfo.status === "PENDIENTE"
              ? "Iniciar"
              : "Finalizar"}
          </button>
        )}
      </div>
      {packageInfo && packageInfo.status !== "CANCELADO" && (
        <button
          className="w-[270px] h-7 text-[14px] text-white border border-[#00ea77] bg-transparent rounded-[13px] absolute mt-[555px]"
          onClick={() => handleCancelDelivery(packageInfo?.id || 0)}
        >
          Cancelar entrega
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default RepartoEnCurso;
