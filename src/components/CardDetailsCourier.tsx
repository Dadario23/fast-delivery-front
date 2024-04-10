"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import iconPlus from "../assets/plus-icon.svg";
import avatarIcon from "../assets/avatar-icon.svg";
import avatarIcon2 from "../assets/avatar-icon2.svg";
import avatarBlueIcon from "../assets/avatar-blue-icon.svg";
import { BiCaretDown } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { getUsers } from "services/dataUsers";
import { getAllPackages } from "services/dataPackages";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface DeliveryUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  createdAt: string;
}
interface DataDeliverys {
  totalDeliveryUsersCount: number;
  activeDeliveryUsersCount: number;
  totalDeliveryUsers: DeliveryUser[];
  activeDeliveryUsers: DeliveryUser[];
}

interface DataPackages {
  id: number;
  trackId: string;
  address: string;
  status: string;
  client: string;
  weight: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  length?: number; 
}
interface Props {
  selectedDate: Date;
  dataDeliverys: DataDeliverys | undefined;
  dataPackages: DataPackages | undefined;
}

interface User {
  isDisabled: boolean;
}

interface Package {
  status: string;
  date:string;
}

const CardDetailsCourier: React.FC<Props> = ({
  selectedDate,
  dataDeliverys,
  dataPackages,
}) => {
  const [enabledDriversCount, setEnabledDriversCount] = useState(0);
  const [totalDriversCount, setTotalDriversCount] = useState(0);
  const [deliveredPackagesCount, setDeliveredPackagesCount] = useState(0);
  const [totalPackagesCount, setTotalPackagesCount] = useState(0);
  const router = useRouter();

  const formattedDate = `${selectedDate.getDate()}-${
    selectedDate.getMonth() + 1
  }-${selectedDate.getFullYear()}`;

  useEffect(() => {
    if (dataPackages && Array.isArray(dataPackages) && selectedDate) {
      let totalPackages = 0;
      let deliveredPackages = 0;

      const formattedDate = formatDate(selectedDate);
      const packagesWithSameDate = dataPackages.filter(pkg => {
        return formatDate(new Date(pkg.date)) === formattedDate;
      });
  

      packagesWithSameDate.forEach((pkg) => {
        totalPackages++;
        if (pkg.status === "ENTREGADO") {
          deliveredPackages++;
        }
      });

      setDeliveredPackagesCount(deliveredPackages);
      setTotalPackagesCount(totalPackages);
    } else {
      setDeliveredPackagesCount(0);
      setTotalPackagesCount(0);
    }
  }, [dataPackages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers: User[] = await getUsers();
        const enabledDrivers = allUsers.filter((user) => !user.isDisabled);
        setEnabledDriversCount(enabledDrivers.length);
        setTotalDriversCount(allUsers.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPackages: Package[] = await getAllPackages();
        const formattedDate = formatDate(selectedDate)
        const packagesWithSameDate = allPackages.filter(pkg => {
          return formatDate(new Date(pkg.date)) === formattedDate;
        });
        setTotalPackagesCount(packagesWithSameDate.length);
  
        const deliveredPackages = packagesWithSameDate.filter(pkg => pkg.status === "ENTREGADO");
        
        setDeliveredPackagesCount(deliveredPackages.length);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const driversPercentage =
    totalDriversCount > 0 ? (enabledDriversCount / totalDriversCount) * 100 : 0;

  const packagesPercentage =
    totalPackagesCount > 0
      ? (deliveredPackagesCount / totalPackagesCount) * 100
      : 0;

  return (
    <>
      <div className="absolute w-[270px] h-[240px] top-[306px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40"></div>
      <span className="absolute w-[59px] h-[15px] top-[315px] left-[55px] text-[#3D1DF3] font-bold text-[14px] leading-[15px] z-40">
        Detalles
      </span>
      <span
        className="absolute w-[60px] h-[15px] top-[316px] left-[209px] text-[14px] leading-[15px] font-normal text-[#3D1DF3] z-40"
        onClick={() => router.push("/packages-office")}
      >
        {formatDate(selectedDate)}
      </span>
      <BiCaretDown className="absolute w-[18px] h-[18px] top-[314px] left-[290px] text-[#3D1DF3] z-40" />
      <hr className="absolute w-[250px] h-[0.5px] top-[336px] left-[55px] border-t border-gray-400  opacity-50 z-40" />
      <div className="absolute w-[270px] h-[240px] top-[306px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40"></div>

      <div className="absolute w-[71px] h-[71px] top-[351px] left-[55px] z-40">
        <CircularProgressbar
          value={driversPercentage}
          text={`${Math.round(driversPercentage)}%`}
          className="rounded-full"
          styles={{
            path: {
              stroke: "rgba(0, 234, 119, 1)",
            },
          }}
        />
      </div>

      <div className="absolute w-[71px] h-[71px] top-[456px] left-[55px] z-40">
        <CircularProgressbar
          value={packagesPercentage}
          text={`${Math.round(packagesPercentage)}%`}
          className="rounded-full"
          styles={{
            path: {
              stroke: "rgba(0, 234, 119, 1)",
            },
          }}
        />
      </div>
      <span className="absolute w-[94px] h-[15px] top-[351px] left-[141px] font-bold leading-[15px] text-[14px] text-[#3D1DF3] z-40">
        Repartidores
      </span>
      <span className="absolute w-[96px] h-[15px] top-[371px] left-[141px] font-normal leading-[15px] text-[12px] text-[#3D1DF3] z-40 whitespace-nowrap">
        {dataDeliverys?.activeDeliveryUsersCount}/
        {dataDeliverys?.totalDeliveryUsersCount} Habilitados
      </span>

      <Image
        className="absolute w-[25px] h-[25px] top-[396px] left-[141px] z-40"
        src={avatarIcon}
        alt=""
      />
      <Image
        className="absolute w-[25px] h-[25px] top-[396px] left-[159px] z-40"
        src={avatarIcon2}
        alt=""
      />

      <button className="absolute w-[51px] h-[25px] top-[396px] left-[249px] rounded-[12.5px] bg-[#00EA77] z-40"></button>
      <span
        className="absolute w-[21px] h-[20px] top-[395px] left-[264px] font-normal text-[#3D1DF3] leading-[25px] text-[12px] z-50"
        onClick={() => router.push(`/delivery-drivers?date=${formattedDate}`)}
      >
        Ver
      </span>
      <span className="absolute w-[100px] h-[15px] top-[476px] left-[141px] font-normal leading-[15px] text-[12px] text-[#3D1DF3] z-40 whitespace-nowrap">
        {deliveredPackagesCount}/{totalPackagesCount} Entregados
      </span>
      <Image
        className="absolute w-[25px] h-[25px] top-[501px] left-[141px] z-40"
        src={avatarIcon}
        alt=""
      />
      <Image
        className="absolute w-[25px] h-[25px] top-[501px] left-[159px] z-40"
        src={avatarIcon2}
        alt=""
      />
      <Image
        className="absolute w-[25px] h-[25px] top-[501px] left-[179px] stroke-[2px] z-40"
        src={avatarBlueIcon}
        alt=""
      />
      <span className="absolute w-[17px] h-[15px] top-[506px] left-[183px] font-semibold text-white text-[10px] leading-[15px] z-40">
        +14
      </span>
      <button className="absolute w-[51px] h-[25px] top-[500px] left-[249px] rounded-[12.5px] bg-[#00EA77] z-40"></button>
      <span
        className="absolute w-[21px] h-[20px] top-[500px] left-[264px] font-normal text-[#3D1DF3] leading-[25px] text-[12px] z-50"
        onClick={() => router.push(`/packages-office?date=${formattedDate}`)}
      >
        Ver
      </span>
      <span className="absolute w-[68px] h-[15px] top-[456px] left-[141px] font-bold leading-[15px] text-[14px] text-[#3D1DF3] z-40">
        Paquetes
      </span>
      <hr className="absolute w-[250px] h-[0.5px] top-[441px] left-[55px] border-t border-gray-400  opacity-50 z-40" />
      <button
        className="absolute w-[270px] h-[30px] top-[566px] left-[45px] bg-[#00EA77] rounded-[15px] z-40"
        type="submit"
      ></button>
      <span
        className="absolute w-[93px] h-[15px] top-[574px] left-[125px] font-normal text-[#3D1DF3] text-[12px] leading-[15px] whitespace-nowrap z-40"
        onClick={() => router.push(`/add-package`)}
      >
        Nuevo paquete
      </span>
      <Image
        src={iconPlus}
        alt=""
        className="absolute w-[12px] h-[12px] top-[575px] left-[223px] z-40"
      />
    </>
  );
};

export default CardDetailsCourier;

// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import iconPlus from "../assets/plus-icon.svg";
// import avatarIcon from "../assets/avatar-icon.svg";
// import avatarIcon2 from "../assets/avatar-icon2.svg";
// import avatarBlueIcon from "../assets/avatar-blue-icon.svg";
// import { BiCaretDown } from "react-icons/bi";
// import { useRouter } from "next/navigation";
// import { getUsers } from "services/dataUsers";
// import { getAllPackages } from "services/dataPackages";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// interface DeliveryUser {
//   id: number;
//   name: string;
//   surname: string;
//   email: string;
//   createdAt: string;
// }
// interface DataDeliverys {
//   totalDeliveryUsersCount: number;
//   activeDeliveryUsersCount: number;
//   totalDeliveryUsers: DeliveryUser[];
//   activeDeliveryUsers: DeliveryUser[];
// }

// interface DataPackages {
//   id: number;
//   trackId: string;
//   address: string;
//   status: string;
//   client: string;
//   weight: number;
//   date: string;
//   createdAt: string;
//   updatedAt: string;
//   userId: number | null;
//   length?: number; 
// }
// interface Props {
//   selectedDate: Date;
//   dataDeliverys: DataDeliverys | undefined;
//   dataPackages: DataPackages | undefined;
// }

// interface User {
//   isDisabled: boolean;
// }

// interface Package {
//   status: string;
// }

// const CardDetailsCourier: React.FC<Props> = ({
//   selectedDate,
//   dataDeliverys,
//   dataPackages,
// }) => {
//   const [enabledDriversCount, setEnabledDriversCount] = useState(0);
//   const [totalDriversCount, setTotalDriversCount] = useState(0);
//   const [deliveredPackagesCount, setDeliveredPackagesCount] = useState(0);
//   const [totalPackagesCount, setTotalPackagesCount] = useState(0);
//   const router = useRouter();

//   const formattedDate = `${selectedDate.getDate()}-${
//     selectedDate.getMonth() + 1
//   }-${selectedDate.getFullYear()}`;

//   useEffect(() => {
//     if (dataPackages && Array.isArray(dataPackages)) {
//       let totalPackages = 0;
//       let deliveredPackages = 0;

//       dataPackages.forEach((pkg) => {
//         totalPackages++;
//         if (pkg.status === "ENTREGADO") {
//           deliveredPackages++;
//         }
//       });

//       setDeliveredPackagesCount(deliveredPackages);
//       setTotalPackagesCount(totalPackages);
//     } else {
//       setDeliveredPackagesCount(0);
//       setTotalPackagesCount(0);
//     }
//   }, [dataPackages]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allUsers: User[] = await getUsers();
//         const enabledDrivers = allUsers.filter((user) => !user.isDisabled);
//         setEnabledDriversCount(enabledDrivers.length);
//         setTotalDriversCount(allUsers.length);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allPackages: Package[] = await getAllPackages();
//         const deliveredPackages = allPackages.filter(
//           (pkg) => pkg.status === "ENTREGADO"
//         );
//         setDeliveredPackagesCount(deliveredPackages.length);
//         setTotalPackagesCount(allPackages.length);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatDate = (date: Date): string => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const driversPercentage =
//     totalDriversCount > 0 ? (enabledDriversCount / totalDriversCount) * 100 : 0;

//   const packagesPercentage =
//     totalPackagesCount > 0
//       ? (deliveredPackagesCount / totalPackagesCount) * 100
//       : 0;

//   return (
//     <>
//       <div className="absolute w-[270px] h-[240px] top-[306px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40"></div>
//       <span className="absolute w-[59px] h-[15px] top-[315px] left-[55px] text-[#3D1DF3] font-bold text-[14px] leading-[15px] z-40">
//         Detalles
//       </span>
//       <span
//         className="absolute w-[60px] h-[15px] top-[316px] left-[209px] text-[14px] leading-[15px] font-normal text-[#3D1DF3] z-40"
//         onClick={() => router.push("/packages-office")}
//       >
//         {formatDate(selectedDate)}
//       </span>
//       <BiCaretDown className="absolute w-[18px] h-[18px] top-[314px] left-[290px] text-[#3D1DF3] z-40" />
//       <hr className="absolute w-[250px] h-[0.5px] top-[336px] left-[55px] border-t border-gray-400  opacity-50 z-40" />
//       <div className="absolute w-[270px] h-[240px] top-[306px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40"></div>

//       <div className="absolute w-[71px] h-[71px] top-[351px] left-[55px] z-40">
//         <CircularProgressbar
//           value={driversPercentage}
//           text={`${Math.round(driversPercentage)}%`}
//           className="rounded-full"
//           styles={{
//             path: {
//               stroke: "rgba(0, 234, 119, 1)",
//             },
//           }}
//         />
//       </div>

//       <div className="absolute w-[71px] h-[71px] top-[456px] left-[55px] z-40">
//         <CircularProgressbar
//           value={packagesPercentage}
//           text={`${Math.round(packagesPercentage)}%`}
//           className="rounded-full"
//           styles={{
//             path: {
//               stroke: "rgba(0, 234, 119, 1)",
//             },
//           }}
//         />
//       </div>
//       <span className="absolute w-[94px] h-[15px] top-[351px] left-[141px] font-bold leading-[15px] text-[14px] text-[#3D1DF3] z-40">
//         Repartidores
//       </span>
//       <span className="absolute w-[96px] h-[15px] top-[371px] left-[141px] font-normal leading-[15px] text-[12px] text-[#3D1DF3] z-40 whitespace-nowrap">
//         {dataDeliverys?.activeDeliveryUsersCount}/
//         {dataDeliverys?.totalDeliveryUsersCount} Habilitados
//       </span>

//       <Image
//         className="absolute w-[25px] h-[25px] top-[396px] left-[141px] z-40"
//         src={avatarIcon}
//         alt=""
//       />
//       <Image
//         className="absolute w-[25px] h-[25px] top-[396px] left-[159px] z-40"
//         src={avatarIcon2}
//         alt=""
//       />

//       <button className="absolute w-[51px] h-[25px] top-[396px] left-[249px] rounded-[12.5px] bg-[#00EA77] z-40"></button>
//       <span
//         className="absolute w-[21px] h-[20px] top-[395px] left-[264px] font-normal text-[#3D1DF3] leading-[25px] text-[12px] z-50"
//         onClick={() => router.push(`/delivery-drivers?date=${formattedDate}`)}
//       >
//         Ver
//       </span>
//       <span className="absolute w-[100px] h-[15px] top-[476px] left-[141px] font-normal leading-[15px] text-[12px] text-[#3D1DF3] z-40 whitespace-nowrap">
//         {deliveredPackagesCount}/{totalPackagesCount} Entregados
//       </span>
//       <Image
//         className="absolute w-[25px] h-[25px] top-[501px] left-[141px] z-40"
//         src={avatarIcon}
//         alt=""
//       />
//       <Image
//         className="absolute w-[25px] h-[25px] top-[501px] left-[159px] z-40"
//         src={avatarIcon2}
//         alt=""
//       />
//       <Image
//         className="absolute w-[25px] h-[25px] top-[501px] left-[179px] stroke-[2px] z-40"
//         src={avatarBlueIcon}
//         alt=""
//       />
//       <span className="absolute w-[17px] h-[15px] top-[506px] left-[183px] font-semibold text-white text-[10px] leading-[15px] z-40">
//         +14
//       </span>
//       <button className="absolute w-[51px] h-[25px] top-[500px] left-[249px] rounded-[12.5px] bg-[#00EA77] z-40"></button>
//       <span
//         className="absolute w-[21px] h-[20px] top-[500px] left-[264px] font-normal text-[#3D1DF3] leading-[25px] text-[12px] z-50"
//         onClick={() => router.push(`/packages-office?date=${formattedDate}`)}
//       >
//         Ver
//       </span>
//       <span className="absolute w-[68px] h-[15px] top-[456px] left-[141px] font-bold leading-[15px] text-[14px] text-[#3D1DF3] z-40">
//         Paquetes
//       </span>
//       <hr className="absolute w-[250px] h-[0.5px] top-[441px] left-[55px] border-t border-gray-400  opacity-50 z-40" />
//       <button
//         className="absolute w-[270px] h-[30px] top-[566px] left-[45px] bg-[#00EA77] rounded-[15px] z-40"
//         type="submit"
//       ></button>
//       <span
//         className="absolute w-[93px] h-[15px] top-[574px] left-[125px] font-normal text-[#3D1DF3] text-[12px] leading-[15px] whitespace-nowrap z-40"
//         onClick={() => router.push(`/add-package`)}
//       >
//         Nuevo paquete
//       </span>
//       <Image
//         src={iconPlus}
//         alt=""
//         className="absolute w-[12px] h-[12px] top-[575px] left-[223px] z-40"
//       />
//     </>
//   );
// };

// export default CardDetailsCourier;
