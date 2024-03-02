'use client'
import React, { useEffect, useState } from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import DateSquare from 'assets/DateSquare/DateSquare'
import Card from 'commons/Card'
import MoreArrow from 'assets/moreArrow'
import { useRouter } from 'next/navigation'
// import { getUser } from "../services/dataUsers";
// import { UserData } from "../types/userTypes";
// import { PackageData } from "types/packageTypes";
import { getAllPackages } from 'services/dataPackages'
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
const DeliveryDrivers = () => {
	// const [users, setUsers] = useState<UserData[]>([]);
	const [firstUserIndex, setFirstUserIndex] = useState<number>(0)

	const [packages, setPackages] = useState<Package[]>([])
	const [ongoingPackage, setOngoingPackage] = useState<Package[]>([])
	// useEffect(() => {
	//   const fetchUsers = async () => {
	//     try {
	//       const data = await getUser();
	//       setUsers(data);
	//     } catch (error) {
	//       console.error("Error al obtener los paquetes:", error);
	//     }
	//   };
	//   fetchUsers();
	// }, []);
	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const data = await getAllPackages()
				if (data.length > 1) {
					const ongoingPackage = data.filter(
						(paq: any) => paq.status === 'ongoing'
					)

					setOngoingPackage(ongoingPackage)
				} else {
					setOngoingPackage(data)
				}
				setPackages(data)
			} catch (error) {
				console.error('Error al obtener los paquetes:', error)
			}
		}
		fetchPackages()
	}, [])
	const handleClickNext = () => {
		if (firstUserIndex + 4 < packages.length) {
			setFirstUserIndex((prevIndex) => prevIndex + 4)
		} else {
			setFirstUserIndex(0)
		}
	}
	console.log(
		'DATA DE PAQUETESSS',
		packages,
		'paquetes finltradd----->',
		ongoingPackage
	)
	// if (ongoingPackage.length > 4) {
	//   const visibleUsers = ongoingPackage.slice(
	//     firstUserIndex,
	//     firstUserIndex + 4
	//   );
	// }
	console.log('ASI QUEDA ONGOINPAGA', ongoingPackage)
	const router = useRouter()
	return (
		<div className="flex items-center justify-center flex-wrap text-[#3d1df3] rounded-xl mx-[30px] mt-[10px] mt-[20px] mb-[60px] bg-[#C7FFB1] relative ">
			<div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl ">
				<div className="ml-3" onClick={() => router.back()}>
					<BackIcon />
				</div>
				<h2 className="text-[#3d1df3] mr-10 flex-grow text-center">
          Repartidores
				</h2>
			</div>

			<div className="h-[495px] w-[300px] bg-white rounded-xl ">
				<h1 className="text-[#3d1df3] font-bold mt-3 mb-[1px] ml-4  ">Enero</h1>
				<div className="border-t border-dotted border-[#3d1df3] text-[#3d1df3] border-w-270 mt-[2px] mx-4 mr-14 relative z-[1]"></div>
				{ongoingPackage.length > 2 ? (
					ongoingPackage.map((profile, index) => (
						<div
							key={index}
							className="mt-4 mx-4  border-b border-dotted border-[#3d1df3] border-w-270"
						>
							<Card profile={profile} />
						</div>
					))
				) : (
					<div className="mt-4 mx-4  border-b border-dotted border-[#3d1df3] border-w-270">
						<Card profile={ongoingPackage[0]} />
					</div>
				)}
			</div>
			<div className="absolute right-4 top-[60px] z-40 text-[12px] shadow-md rounded-[10px] ">
				<DateSquare day="mie" date={0o3} />{' '}
			</div>
			<div className="absolute bottom-3" onClick={handleClickNext}>
				<MoreArrow />{' '}
			</div>
		</div>
	)
}

export default DeliveryDrivers
