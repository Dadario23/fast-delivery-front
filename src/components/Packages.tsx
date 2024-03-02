'use client'
import React, { useEffect, useState } from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import PackageIcon from 'assets/Package/package'
import TrashIcon from 'assets/TrashIcon/trashIcon'
import ArrowDown from 'assets/ArrowDown/arrowDown'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/navigation'
import { getAllPackages } from 'services/dataPackages'

interface Package {
	id: number;
	trackId: number;
	address: string;
}

const PackagesOffice: React.FC = () => {
	const [firstPackageIndex, setFirstPackageIndex] = useState<number>(0)
	const router = useRouter()
	const [packages, setPackages] = useState<Package[]>([])

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const data = await getAllPackages()
				setPackages(data)
			} catch (error) {
				console.error('Error al obtener los paquetes:', error)
			} 
		}
		fetchPackages()
	}, [])

	const handleClickNext = () => {
		if (firstPackageIndex + 4 < packages.length) {
			setFirstPackageIndex((prevIndex) => prevIndex + 4)
		} else {
			setFirstPackageIndex(0)
		}
	}

	const visiblePackages = packages.slice(firstPackageIndex, firstPackageIndex + 4)

	return (
		<div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] bg-[#C7FFB1] mt-[20px] h-[555px] relative">
			<div className="w-full h-[55px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10">
				<div className="ml-3" onClick={() => router.back()}>
					<BackIcon />
				</div>
				<h1 className="font-bold text-[#3d1df3] mr-10 flex-grow text-center">Paquetes</h1>
			</div>
			<div className="bg-white rounded-xl w-[300px] h-[495px] z-20 relative overflow-hidden">
				<h1 className="font-bold text-[#3d1df3] text-center text-[14px] ml-[-14.2rem] mt-3">Enero</h1>
				<div className="absolute border border-[#8976F8] h-[50px] w-[41px] ml-[15.4rem] top-[10px] rounded-[10px] transition-all duration-300 ease-in-out">
					<p className="absolute text-[#3d1df3] text-center text-[12px] mt-[8px] ml-[9px]">mie</p>
					<p className="absolute font-bold text-[#3d1df3] text-center text-[16px] mt-[21px] ml-[10px]">03</p>
				</div>
				<hr className="border-t border-dotted border-[#CAC0FF] mb-4 w-[230px] h-[0.5px] ml-4" />
				<h1 className="realtive font-bold text-[#3d1df3] text-center text-[12px] ml-[-11.6rem] mt-[24px]">
					{packages.length} paquetes
				</h1>
				<div style={{ position: 'relative', top: '-5px' }}>
					{visiblePackages.map((packageItem, index) => (
						<div
							className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px] transition-all duration-300 ease-in-out"
							key={index}
						>
							<div className="absolute ml-[-1px] mt-[20px]">
								<PackageIcon />
							</div>
							<div className="absolute ml-[15rem] mt-[32px]">
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
				{packages.length > 4 && (
					<div className="absolute ml-[140px] mt-[30px]" onClick={handleClickNext}>
						<ArrowDown />
					</div>
				)}
			</div>
		</div>
	)
}

export default PackagesOffice


