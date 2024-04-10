"use client";
import React, { useState } from "react";
import BackIcon from "assets/BackIcon/back-icon";
import { useRouter } from "next/navigation";
import { postAffidavit } from "../services/dataAffidavit";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from "services/dataUsers";
import { dataLogout } from "services/dataAuth";
import { removeUserFromPackage } from "services/dataPackages";
import { clear } from "state/user";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Affidavit = () => {
  const router = useRouter();
  const [drunk, setDrunk] = useState<string | null>(null);
  const [consumedPsychot, setConsumedPsychot] = useState<string | null>(null);
  const [depressed, setDepressed] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (drunk && consumedPsychot && depressed) {
      const selectedPackages = localStorage.getItem("selectedPackages");
      const selectedPackageInOnGoing = localStorage.getItem("currentPackageId");

      if (drunk === "si" || consumedPsychot === "si" || depressed === "si") {
        if (selectedPackages) {
          const parsedSelectedPackages = JSON.parse(selectedPackages);

          parsedSelectedPackages.forEach(async (packageId: number) => {
            try {
              await removeUserFromPackage(packageId);
            } catch (error) {
              console.error("Error al eliminar al usuario del paquete:", error);
              toast.error("Error al eliminar al usuario del paquete");
            }
          });
          localStorage.removeItem("selectedPackages");
        }
        if (selectedPackageInOnGoing) {
          try {
            await removeUserFromPackage(parseInt(selectedPackageInOnGoing));
          } catch (error) {
            console.error("Error al eliminar al usuario del paquete:", error);
            toast.error("Error al eliminar al usuario del paquete");
          }
          localStorage.removeItem("currentPackageId");
        }

        toast(
          "Siguiendo las normativas de la Comisión Nacional de Regulación de Transporte, USTED NO PUEDE CONTINUAR"
        );
        postAffidavit({ drunk, consumedPsychot, depressed });
        updateUser();
        await dataLogout();
        dispatch(clear(null));
        await router.push("/");
      } else {
        postAffidavit({ drunk, consumedPsychot, depressed });
        router.push("/home");
      }
    } else {
      toast("Por favor seleccione todas las opciones.");
    }
  };

  const handleClickAlcohol = (e: string) => {
    setDrunk(e);
  };

  const handleClickPiscotrop = (e: string) => {
    setConsumedPsychot(e);
  };

  const handleClickDepression = (e: string) => {
    setDepressed(e);
  };

  return (
    <div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative">
      <div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1]">
        {/* <div className="ml-3" onClick={() => router.back()}>
					<BackIcon />
				</div> */}
        <h2 className="text-[#3d1df3] mr-3 flex-grow text-center">
          Declaración jurada
        </h2>
      </div>
      <div className="bg-white rounded-xl z-20 text-[80%] w-[19rem] pt-[1rem]">
        <div className="text-[#3d1df3] text-wrap pl-4">
          <h3 className="text-[11px] mt-4">Requerido* </h3>
          <div className="text-wrap text-center text-[12px] leading-tight align-center w-[270px] h-[90px] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Ha consumido bebidas alcohólicas en las últimas 12 horas?{" "}
            <div className="flex justify-self-stretch space-x-3 ml-12 mt-2">
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  drunk === "si" ? "bg-[#00ea77] text-white" : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickAlcohol("si");
                }}
              >
                Sí
              </button>
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  drunk === "no" ? "bg-[#00ea77] text-white" : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickAlcohol("no");
                }}
              >
                No
              </button>
            </div>
          </div>
          <h3 className="text-[11px]">Requerido* </h3>
          <div className="text-wrap text-center leading-tight text-[12px] align-center w-[270px] h-[125px] pt-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Usted está haciendo uso de algún medicamento psicoactivo?
            <p className="text-[10px] leading-normal italic mt-1 mb-2">
              {" "}
              por ejemplo tranquilizantes, antigripales, antialérgicos o para
              insomnio.
            </p>
            <div className="flex justify-self-stretch space-x-3 ml-14 mt-1">
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  consumedPsychot === "si"
                    ? "bg-[#00ea77] text-white"
                    : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickPiscotrop("si");
                }}
              >
                Sí
              </button>
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  consumedPsychot === "no"
                    ? "bg-[#00ea77] text-white"
                    : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickPiscotrop("no");
                }}
              >
                No
              </button>
            </div>
          </div>
          <h3 className="text-[11px] mt-2">Requerido* </h3>
          <div className="text-wrap text-center leading-tight text-[12px] align-center w-[270px] h-[100px] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Tiene usted algún tipo de problema familiar, emocional o de
            cualquier tipo que lo distraiga ?
            <div className="flex justify-self-stretch space-x-3 ml-12 mt-1">
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  depressed === "si" ? "bg-[#00ea77] text-white" : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickDepression("si");
                }}
              >
                Sí
              </button>
              <button
                className={`w-[74px] h-[30px] mb-2 p-2 ${
                  depressed === "no" ? "bg-[#00ea77] text-white" : "bg-white"
                } border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77] `}
                onClick={() => {
                  handleClickDepression("no");
                }}
              >
                No
              </button>
            </div>
          </div>
          <button
            className="w-[270px] h-[30px] text-[14px] mt-[20px] mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center hover:bg-white hover:border border-[#00ea77]"
            onClick={handleSubmit}
          >
            Continuar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Affidavit;
