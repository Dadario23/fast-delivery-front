'use client'
import React, { useEffect, useState } from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import Check from 'assets/Check/check'
import { useRouter } from 'next/navigation'
import { getAllPackages } from 'services/dataPackages'
import { assignPackageToUser } from 'services/dataPackages'

interface Package {
	id: number;
	address: string;
	status: string
}
const PackagesSelection: React.FC = () => {
	const router = useRouter()
	const [selectedPackages, setSelectedPackages] = useState<number[]>([])
	const [packages, setPackages] = useState<Package[]>([])

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const data = await getAllPackages()
				const filteredPackages = data.filter(
					(packageItem) => packageItem.status === 'PENDIENTE' && !packageItem.userId
				) //DA ESTE ERROR PERO FUNCIONA IGUAL
				setPackages(filteredPackages)
			} catch (error) {
				console.error('Error al obtener los paquetes:', error)
			}
		}
		fetchPackages()
	}, [])

	const handleClick = (packageId: number) => {
		setSelectedPackages((prevSelected) =>
			prevSelected.includes(packageId)
				? prevSelected.filter((selectedId) => selectedId !== packageId)
				: [...prevSelected, packageId]
		)
	}

	const handleStartJourney = async () => {
		try {
			await Promise.all(
				selectedPackages.map((packageId) => assignPackageToUser(packageId))
			)
			router.push('/affidavit')
		} catch (error) {
			console.error('Error al iniciar la jornada:', error)
		}
	}

	return (
		<div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] bg-[#C7FFB1] mt-[20px] h-[74px] relative ">
			<div className="w-full h-[55px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
				<div className="ml-3" onClick={() => router.back()}>
					<BackIcon />
				</div>
				<h2 className=" font-bold text-[#3d1df3] mr-10 flex-grow text-center">
          Obtener paquetes
				</h2>
			</div>
			<div className="bg-white rounded-xl w-[300px] h-[452px] z-20 overflow-y-auto">
				<h1 className="text-[#3d1df3] text-center text-[12px] mt-2 mb-2">
          ¿Cuántos paquetes repartirás hoy?
				</h1>
				<hr className="border-t border-[#CAC0FF] mb-4 w-[270px] h-[0.5px] ml-4" />
				{packages.map((packageItem) => (
					<div
						className="relative border border-[#3d1df3] h-[46px] w-[270px] ml-[15px] mb-[10px] rounded-[10px]"
						key={packageItem.id}
						onClick={() => handleClick(packageItem.id)}
					>
						<div className="absolute border-[1px] border-[#3d1df3] w-[16px] h-[16px] rounded-[5px] ml-[10px] mt-[14px] ">
							{selectedPackages.includes(packageItem.id) && (
								<div className="ml-[-1px] mt-[-1px]">
									<Check />
								</div>
							)}
						</div>
						<div
							className="text-[#3d1df3] text-[12px] ml-[50px] mt-[9px]"
							onClick={() => router.push('/ongoing-delivery')}
						>
							{packageItem.address}
						</div>
						<div className="bg-[#CAC0FF] absolute w-[1px] h-[75%] left-[37px] top-[0.4rem]"></div>
					</div>
				))}
			</div>
			<button
				className="bg-[#00ea77] text-[14px] text-[#3d1df3] rounded-[15px] h-[30px] w-[16.5rem] mt-[10px]"
				onClick={handleStartJourney}
			>
        Iniciar jornada
			</button>
		</div>
	)
}
export default PackagesSelection
