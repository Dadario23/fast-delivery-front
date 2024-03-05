import React from 'react'
import { useRouter } from 'next/navigation'
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
// import { UserData } from "../types/userTypes";
// import { getPackagesByUserId } from "../services/dataPackages";
// import { PackageData, PackageStatus } from "types/packageTypes";
// import { percentageCalculator } from "utils/utils";

export interface Package {
	id: number;
	trackId?: string;
	address: string;
	status: 'delivered' | 'cancelled' | 'pending' | 'ongoing' | undefined | null;
	client: string;
	weight: number;
	date: Date;
	// createdAt: Date;
	// updatedAt: Date;
	user: {
		id: number;
		name: string;
		email: string;
	};
	userId: number;
	percentage: number;
}

const Card = ({ profile }: { profile: Package }) => {
	console.log('este es el profile que llega a card', profile)
	// const [id, setId] = useState<number | undefined>();
	// setId(profile.id);
	// const [ongoingPackage, setOngoingPackage] = useState<{ status: string }>({
	//   status: "",
	// });
	// useEffect(() => {
	//   const fetchUserPackages = async () => {
	//     try {
	//       const data = await getPackagesByUserId(profile.user.id);
	//       console.log("lo que trae el fetch paquetes", data, profile.user.id);
	//       let completed;
	//       if (data.length > 1) {
	//         completed = data.filter((paq: any) => {
	//           paq.status === "delivered";
	//         });
	//       }
	//       const total = data.length;
	//       profile.percentage = percentageCalculator(completed, total);
	//       console.log(
	//         "TOTAL, COMPLETED, PROFILE.PERCENTAGE",
	//         total,
	//         completed,
	//         profile.percentage
	//       );
	//     } catch (error) {
	//       console.error("Error al obtener los paquetes:", error);
	//     }
	//   };
	//   fetchUserPackages();
	// }, []);
	// const percentage = percentageCalculator(data)
	// console.log("packages antes del filter", ongoingPackage.status);
	// let ongoingPackages;
	// if (packages.length > 1) {
	//   ongoingPackages = packages.filter(
	//     (packageItem, index) => packageItem.status == "ongoing"
	//   );
	// } else if (packages.length == 1) {
	//   ongoingPackage = packages;
	// }

	const router = useRouter()
	return (
		<div
			className=" flex space-x-1 mr-2 relative"
			onClick={() => router.push('/driver-profile')}
		>
			<div className="mb-2 text-[#3d1df3] font-[16px] font-semibold">
				<div
					style={{
						width: '71px',
						height: '73px',
						color: '#3d1df3',
					}}
				>
					{/* <CircularProgressbar
            value={profile.percentage}
            text={`${profile.percentage}%`}
            styles={buildStyles({
              pathColor: "#00EA77",
              textColor: "#3d1df3",
              trailColor: "C7FFB1",
              backgroundColor: "#626262",
              pathTransitionDuration: 2,
              strokeLinecap: "butt",
            })}
          /> */}
				</div>
			</div>
			<div className="flex flex-col pl-4 mt-3 mb-0 ">
				<div style={{ fontSize: '14px' }} className="ml-6 mb-1 font-bold">
					{profile.user.name}
					{/* {packages.length > 1 &&
            packages.map((paquete, index) => (
              <div
                style={{
                  backgroundColor: "#F8E169",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
                key={index}
                className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
              >
                {paquete.status}
              </div>
            ))} */}
				</div>
				<div
					style={{
						backgroundColor: '#F8E169',
						fontWeight: '600',
						fontSize: '10px',
					}}
					className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
				>
					{profile.status}
				</div>
				<div
					style={{
						backgroundColor: '#F8E169',
						fontWeight: '600',
						fontSize: '10px',
					}}
					className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
				>
					{/* {packages[0].status} */}
				</div>
				{/* {package.status === "EN CURSO" && (
          <div
            style={{
              backgroundColor: "#F8E169",
              fontWeight: "600",
              fontSize: "10px",
            }}
            className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
          >
            {package.status}
          </div>
        )}
        {package.status === "ENTREGADO" && (
          <div
            style={{ fontWeight: "600", fontSize: "10px" }}
            className="bg-[#C7FFB1] text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
          >
            {profile.status}
          </div>
        )}
        {package.status === "DESHABILITADO" && (
          <div
            style={{
              backgroundColor: "rgba(98, 98, 98, 0.2)",
              color: "#626262",
              fontWeight: "600",
              fontSize: "10px",
            }}
            className="text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
          >
            {package.status}
          </div>
        )} */}
			</div>

			<img
				// src={profile.image}
				alt="foto"
				style={{ height: '40px', width: '40px' }}
				className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
			/>
		</div>
	)
}

export default Card
