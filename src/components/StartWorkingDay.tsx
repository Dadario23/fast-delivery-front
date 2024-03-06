'use client'
import React, { useEffect, useState } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import PackageIcon from 'assets/Package/package'
import TrashIcon from 'assets/TrashIcon/trashIcon'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/navigation'
import {
	getUserPackages,
	removeUserFromPackage,
	updatePackageStatusToOngoing,
} from 'services/dataPackages'

interface Package {
	id: number;
	trackId: number;
	address: string;
	status: string;
}

const StartWorkingDay: React.FC = () => {
	const [isExpanded1, setIsExpanded1] = useState(false)
	const [isExpanded2, setIsExpanded2] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [maxHeight1, setMaxHeight1] = useState('230px')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [maxHeight2, setMaxHeight2] = useState('230px')
	const router = useRouter()
	const [packages, setPackages] = useState<Package[]>([])

	const toggleExpand1 = () => {
		setIsExpanded1(!isExpanded1)
		setMaxHeight1(isExpanded1 ? '55px' : '230px')
	}

	const toggleExpand2 = () => {
		setIsExpanded2(!isExpanded2)
		setMaxHeight2(isExpanded2 ? '55px' : '230px')
	}

	const handleRemoveUserFromPackage = async (packageId: number) => {
		try {
			await removeUserFromPackage(packageId)
			const updatedPackages = packages.filter(
				(packageItem) => packageItem.id !== packageId
			)
			setPackages(updatedPackages)
		} catch (error) {
			console.error('Error al eliminar el usuario del paquete:', error)
		}
	}

	const handleStartPackage = async (packageId: number) => {
		try {
			await updatePackageStatusToOngoing(packageId)
			const updatedPackages = packages.map((packageItem) =>
				packageItem.id === packageId
					? { ...packageItem, status: 'EN CURSO' }
					: packageItem
			)
			setPackages(updatedPackages)
		} catch (error) {
			console.error('Error al iniciar el paquete:', error)
		}
	}

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const packages = await getUserPackages()
				setPackages(packages)
			} catch (error) {
				console.error('Error al obtener los paquetes:', error)
			}
		}

		fetchPackages()
	}, [])

	
	
	return (
		<div className="flex flex-col items-center space-y-4">
			<div
				className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
					isExpanded1 ? 'h-[230px]' : 'h-[55px]'
				} overflow-y-auto`}
			>
				<div
					className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer z-[1]"
					onClick={toggleExpand1}
				>
					{isExpanded1 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
				</div>
				{isExpanded1 ? (
					<div className="overflow-x-hidden max-h-[220px] pr-4">
						<h1 className="font-bold text-[#3d1df3] mt-[17px] ml-[15px]">
              Repartos pendientes
						</h1>
						{packages
							.filter(
								(packageItem) =>
									packageItem.status === 'EN CURSO' ||
                  packageItem.status === 'PENDIENTE'
							)
							.map((packageItem, index) => (
								<div
									className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[4px] rounded-[10px] transition-all duration-300 ease-in-out"
									key={index}
								>
									<div
										className={`absolute text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[70px] font-semibold ml-[198px] mt-[10px] ${
											packageItem.status === 'PENDIENTE'
												? 'bg-[#aa9cfa]'
												: packageItem.status === 'EN CURSO'
													? 'bg-[#f2dc5d]'
													: ''
										}`}
									>
										{packageItem.status}
									</div>
									<div className="absolute ml-[-1px] mt-[20px]">
										<PackageIcon />
									</div>
									<div className="absolute ml-[15rem] mt-[50px]">
										{packageItem.status === 'PENDIENTE' ? (
											<button
												className="absolute bg-[#00ea77] text-[12px] text-[#3d1df3] text-center rounded-[15px] w-[67px] h-[26px] left-[-48px] top-[-7px]"
												onClick={() => handleStartPackage(packageItem.id)}
											>
                        Iniciar
											</button>
										) : (
											<div
												className="ml-[-2px] mt-[-3px]"
												onClick={() =>
													handleRemoveUserFromPackage(packageItem.id)
												}
											>
												<TrashIcon />
											</div>
										)}
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
				) : (
					<h1 className="font-bold text-[#3d1df3] mt-[17px] left-[15px] absolute">
            Repartos pendientes
					</h1>
				)}
			</div>
			<div
				className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
					isExpanded2 ? 'h-[255px]' : 'h-[55px]'
				} overflow-y-auto`}
			>
				<div
					className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer z-[1]"
					onClick={toggleExpand2}
				>
					{isExpanded2 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
				</div>
				{!isExpanded2 && (
					<>
						<h1 className="font-bold text-[#3d1df3] mt-[15px] left-[16px] absolute">
        Historial de repartos
						</h1>
					</>
				)}
				{isExpanded2 && (
					<div className="overflow-x-hidden max-h-[240px] pr-4">
						<h1 className="font-bold text-[#3d1df3] right-[-16px] mt-[15px] relative">
        Historial de repartos
						</h1>
						{isExpanded2 && (
							<h2 className="text-[#3d1df3] text-[12px] right-[-16px] mt-[3px] relative">
								{
									packages.filter(
										(packageItem) => packageItem.status === 'ENTREGADO'
									).length
								}{' '}
          paquetes entregados
							</h2>
						)}
						{packages
							.filter((packageItem) => packageItem.status === 'ENTREGADO')
							.map((packageItem, index) => (
								<div
									className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[8px] rounded-[10px] transition-all duration-300 ease-in-out"
									key={index}
								>
									<div className="absolute bg-[#c7ffb1] text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[70px] font-semibold ml-[198px] mt-[15px]">
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
				onClick={() => router.push('/packages-selection')}
			>
  Obtener paquetes
			</button>
		</div>
	)
}

export default StartWorkingDay
//return (
// 	<div className="flex flex-col items-center space-y-4">
// 		{/* <div
//       className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
//         isExpanded1 ? "h-[230px]" : "h-[55px]"
//       }`}
//     > */}
// 		<div
// 			className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
// 				isExpanded1 ? 'h-[230px]' : 'h-[55px]'
// 			} overflow-y-auto`}
// 		>
// 			<h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px] absolute">
//         Repartos pendientes
// 			</h1>
// 			<div
// 				className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer z-[1]"
// 				onClick={toggleExpand1}
// 			>
// 				{isExpanded1 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
// 			</div>
// 			{isExpanded1 && (
// 				<div className="overflow-x-hidden max-h-[215px] pr-4">
// 					{packages
// 						.filter(
// 							(packageItem) =>
// 								packageItem.status === 'EN CURSO' ||
//                 packageItem.status === 'PENDIENTE'
// 						)
// 						.map((packageItem, index) => (
// 							<div
// 								className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[45px] rounded-[10px] transition-all duration-300 ease-in-out"
// 								key={index}
// 							>
// 								<div
// 									className={`absolute text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[70px] font-semibold ml-[198px] mt-[10px] ${
// 										packageItem.status === 'PENDIENTE'
// 											? 'bg-[#aa9cfa]'
// 											: packageItem.status === 'EN CURSO'
// 												? 'bg-[#f2dc5d]'
// 												: ''
// 									}`}
// 								>
// 									{packageItem.status}
// 								</div>
// 								<div className="absolute ml-[-1px] mt-[20px]">
// 									<PackageIcon />
// 								</div>
// 								<div className="absolute ml-[15rem] mt-[50px]">
// 									{packageItem.status === 'PENDIENTE' ? (
// 										<button
// 											className="absolute bg-[#00ea77] text-[12px] text-[#3d1df3] text-center rounded-[15px] w-[67px] h-[26px] left-[-48px] top-[-7px]"
// 											onClick={() => handleStartPackage(packageItem.id)}
// 										>
//                       Iniciar
// 										</button>
// 									) : (

// 										<div
// 											className="ml-[-2px] mt-[-3px]"
// 											onClick={() =>
// 												handleRemoveUserFromPackage(packageItem.id)
// 											}
// 										>
// 											<TrashIcon />
// 										</div>
// 									)}
// 								</div>
// 								<div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
// 									{packageItem.trackId}
// 								</div>
// 								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
// 									{packageItem.address}
// 								</div>
// 								<div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
// 							</div>
// 						))}
// 				</div>
// 			)}
// 		</div>

// 		{/* <div
//       className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
//         isExpanded2 ? "h-[255px]" : "h-[55px]"
//       }`}
//     > */}
// 		<div
// 			className={`flex justify-center rounded-[10px] mx-[30px] bg-white mt-[20px] w-[300px] relative ${
// 				isExpanded2 ? 'h-[255px]' : 'h-[55px]'
// 			} overflow-y-auto`}
// 		>
// 			<h1 className="font-bold text-[#3d1df3] mr-[98px] mt-[15px] absolute">
//         Historial de repartos
// 			</h1>
// 			{isExpanded2 && (
// 				<h2 className="absolute text-[#3d1df3] text-[12px] mr-[126px] mt-[40px]">
// 					{
// 						packages.filter(
// 							(packageItem) => packageItem.status === 'ENTREGADO'
// 						).length
// 					}{' '}
//           paquetes entregados
// 				</h2>
// 			)}
// 			<div
// 				className="mt-5 right-[10px] text-[#3d1df3] text-[18px] absolute cursor-pointer z-[1]"
// 				onClick={toggleExpand2}
// 			>
// 				{isExpanded2 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
// 			</div>
// 			{isExpanded2 && (
// 				<div className="overflow-x-hidden max-h-[240px] pr-4">
// 					{packages
// 						.filter((packageItem) => packageItem.status === 'ENTREGADO')
// 						.map((packageItem, index) => (
// 							<div
// 								className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[70px] rounded-[10px] transition-all duration-300 ease-in-out"
// 								key={index}
// 							>
// 								<div className="absolute bg-[#c7ffb1] text-[#3d1df3] rounded-l-[15px] text-center text-[10px] w-[70px] font-semibold ml-[198px] mt-[15px]">
// 									{packageItem.status}
// 								</div>
// 								<div className="absolute ml-[-1px] mt-[20px]">
// 									<PackageIcon />
// 								</div>
// 								<div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
// 									{packageItem.trackId}
// 								</div>
// 								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
// 									{packageItem.address}
// 								</div>
// 								<div className="border-l border-dotted border-[#CAC0FF] h-[60px] ml-[39px] mt-[0.6rem]"></div>
// 							</div>
// 						))}
// 				</div>
// 			)}
// 		</div>
// 		<button
// 			className="absolute bg-[#00ea77] text-[14px] text-[#3d1df3] rounded-[15px] h-[30px] w-[16.5rem] bottom-[25px]"
// 			onClick={() => router.push('/packages-selection')}
// 		>
//       Obtener paquetes
// 		</button>
// 	</div>
// )
