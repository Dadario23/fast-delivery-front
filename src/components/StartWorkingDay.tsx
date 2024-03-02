// 'use client';
// import React from 'react';
// import DeliveriesAndHistory from './DeliveriesAndHistory';
// import { useRouter } from "next/navigation";
// const StartWorkingDay: React.FC = () => {
//  const router = useRouter();
//   return (
//     <div className='flex flex-col w-full h-[92%] p-6 pt-3 items-center bg-customBlue text-customBlue'>
//       <div className='h-[96%] w-full'>
//       <DeliveriesAndHistory repartos={[]} historial={[]}/>
//       </div>
//       <div className='flex justify-center items-center w-full h-[4%]'>
//         <button
//           style={{ backgroundColor: "#00ea77" }}
//           className="flex items-center justify-center  p-2 w-10/12 text-indigo-700 rounded-3xl transition-all duration-200 ease-in-out active:bg-green-600"
//           onClick={() => router.push("/packages-selection")}
//         >
//           <h2 className="">Obtener Paquetes</h2>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StartWorkingDay;

// "use client";
// import React, { useEffect, useState } from "react";
// import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
// import PackageIcon from "assets/Package/package";
// import TrashIcon from "assets/TrashIcon/trashIcon";
// import "tailwindcss/tailwind.css";
// import { useRouter } from "next/navigation";
// import { getAllPackages } from "services/dataPackages";

// interface Package {
//   id: number;
//   trackId: number;
//   address: string;
// }

// const PackagesOffice: React.FC = () => {
//   const [isExpanded1, setIsExpanded1] = useState(true);
//   const [isExpanded2, setIsExpanded2] = useState(true);
//   const router = useRouter();
//   const [packages, setPackages] = useState<Package[]>([]);

//   const toggleExpand1 = () => {
//     setIsExpanded1(!isExpanded1);
//   };

//   const toggleExpand2 = () => {
//     setIsExpanded2(!isExpanded2);
//   };

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await getAllPackages();
//         setPackages(data);
//       } catch (error) {
//         console.error("Error al obtener los paquetes:", error);
//       }
//     };
//     fetchPackages();
//   }, []);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//     {/* <div className="flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] h-[230px] w-[300px] relative"> */}
//     <div
//         className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
//           isExpanded1 ? 'h-[230px]' : 'h-[55px]'
//         }`}
//       >
//       <h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px]">
//         Repartos pendientes
//       </h1>
//       {/* <div className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute">
//         <TiArrowSortedDown />
//       </div> */}
//          <div
//           className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer"
//           onClick={toggleExpand1}
//         >
//           {isExpanded1 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
//         </div>
//         {isExpanded1 && (
//       <div style={{ position: "relative", top: "-5px" }}>
//         {packages.map((packageItem, index) => (
//           <div
//             className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px] transition-all duration-300 ease-in-out"
//             key={index}
//           >
//             <div className="absolute ml-[-1px] mt-[20px]">
//               <PackageIcon />
//             </div>
//             <div className="absolute ml-[15rem] mt-[32px]">
//               <TrashIcon />
//             </div>
//             <div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
//               {packageItem.trackId}
//             </div>
//             <div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
//               {packageItem.address}
//             </div>
//             <div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
//           </div>
//         ))}
//       </div>

//         )}

//     </div>

//     <div
//         className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
//           isExpanded2 ? 'h-[230px]' : 'h-[55px]'
//         }`}
//       >
//     {/* <div className="flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] h-[230px] w-[300px] relative"> */}
//       <h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px]">
//         Historial de repartos
//       </h1>
//       {/* <div className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute">
//         <TiArrowSortedDown />
//       </div> */}
//       <div
//           className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer"
//           onClick={toggleExpand2}
//         >
//           {isExpanded2 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
//         </div>
//         {isExpanded1 && (
//       <div style={{ position: "relative", top: "-5px" }}>
//         {packages.map((packageItem, index) => (
//           <div
//             className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px] transition-all duration-300 ease-in-out"
//             key={index}
//           >
//             <div className="absolute ml-[-1px] mt-[20px]">
//               <PackageIcon />
//             </div>
//             <div className="absolute ml-[15rem] mt-[32px]">
//               <TrashIcon />
//             </div>
//             <div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
//               {packageItem.trackId}
//             </div>
//             <div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
//               {packageItem.address}
//             </div>
//             <div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
//           </div>
//         ))}
//       </div>
//         )}
//     </div>
//     </div>
//   );
// };

// export default PackagesOffice;

"use client";
import React, { useEffect, useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import PackageIcon from "assets/Package/package";
import TrashIcon from "assets/TrashIcon/trashIcon";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";
import { getUserPackages } from "services/dataPackages";

interface Package {
  id: number;
  trackId: number;
  address: string;
  status: string;
}

const StartWorkingDay: React.FC = () => {
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [maxHeight1, setMaxHeight1] = useState("230px"); 
  const [maxHeight2, setMaxHeight2] = useState("230px"); 
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);

  const toggleExpand1 = () => {
    setIsExpanded1(!isExpanded1);
    setMaxHeight1(isExpanded1 ? "55px" : "230px");
  };

  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
    setMaxHeight2(isExpanded2 ? "55px" : "230px");
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await getUserPackages();
        setPackages(packages);
      } catch (error) {
        console.error("Error al obtener los paquetes:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
          isExpanded1 ? "h-[230px]" : "h-[55px]"
        }`}
      >
        <h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px] absolute">
          Repartos pendientes
        </h1>
        <div
          className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer"
          onClick={toggleExpand1}
        >
          {isExpanded1 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        </div>
        {isExpanded1 && (
          <div className="overflow-x-hidden max-h-[215px] pr-4">
            {packages
              .filter(
                (packageItem) =>
                  packageItem.status === "EN CURSO" ||
                  packageItem.status === "PENDIENTE"
              )
              .map((packageItem, index) => (
                <div
                  className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[45px] rounded-[10px] transition-all duration-300 ease-in-out"
                  key={index}
                >
                  <div
                    className={`absolute text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[68px] font-semibold ml-[200px] mt-[15px] ${
                      packageItem.status === "PENDIENTE"
                        ? "bg-[#aa9cfa]"
                        : packageItem.status === "EN CURSO"
                        ? "bg-[#f2dc5d]"
                        : ""
                    }`}
                  >
                    {packageItem.status}
                  </div>
                  <div className="absolute ml-[-1px] mt-[20px]">
                    <PackageIcon />
                  </div>
                  <div className="absolute ml-[15rem] mt-[50px]">
                    <TrashIcon />
                  </div>
                  <div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
                    {packageItem.trackId}
                  </div>
                  <div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
                    {packageItem.address}
                  </div>
                  <div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div
        className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
          isExpanded2 ? "h-[255px]" : "h-[55px]"
        }`}
      >
        <h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px] absolute">
          Historial de repartos
        </h1>
        {isExpanded2 && (
  <h2 className="absolute text-[#3d1df3] text-[12px] mr-[126px] mt-[40px]">
    {packages.filter(packageItem => packageItem.status === "ENTREGADO").length} paquetes entregados
  </h2>
)}
        <div
          className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer"
          onClick={toggleExpand2}
        >
          {isExpanded2 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        </div>
        {isExpanded2 && (
          <div className="overflow-x-hidden max-h-[250px] pr-4">
            {packages
              .filter((packageItem) => packageItem.status === "ENTREGADO")
              .map((packageItem, index) => (
                <div
                  className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[70px] rounded-[10px] transition-all duration-300 ease-in-out"
                  key={index}
                >
                  <div className="absolute bg-[#c7ffb1] text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[68px] font-semibold ml-[200px] mt-[15px]">
                    {packageItem.status}
                  </div>
                  <div className="absolute ml-[-1px] mt-[20px]">
                    <PackageIcon />
                  </div>
                  <div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
                    {packageItem.trackId}
                  </div>
                  <div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
                    {packageItem.address}
                  </div>
                  <div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
                </div>
              ))}
          </div>
        )}
      </div>
      <button
				className="absolute bg-[#00ea77] text-[14px] text-[#3d1df3] rounded-[15px] h-[30px] w-[16.5rem] bottom-[25px]"
        onClick={() => router.push("/packages-selection")}>
        Obtener paquetes
			</button>
    </div>
    
  );
};

export default StartWorkingDay
