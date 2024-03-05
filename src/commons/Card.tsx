import React from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import { UserData } from "../types/userTypes";
// import { getPackagesByUserId } from "../services/dataPackages";
// import { PackageData, PackageStatus } from "types/packageTypes";
import { percentageCalculator } from 'utils/utils'

export interface Package {
	id: number;
	trackId?: string;
	address: string;
	status:
	| 'ENTREGADO'
	| 'CANCELADO'
	| 'PENDIENTE'
	| 'EN CURSO'
	| undefined
	| null;
	client: string;
	weight: number;
	date: Date;
	// createdAt: Date;
	// updatedAt: Date;
	user: {
		id: number;
		name: string | undefined | null;
		email: string;
		isDisabled: boolean;
	};
	userId: number;
	percentage: number;
	total: number;
	delivered: number;
}

const Card = ({ profile }: { profile: Package }) => {
	const router = useRouter()
	if (!profile) {
		return null
	}

	profile.percentage = percentageCalculator(profile.delivered, profile.total)

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
					<CircularProgressbar
						value={profile.percentage}
						text={`${profile.percentage}%`}
						styles={buildStyles({
							pathColor: '#00EA77',
							textColor: '#3d1df3',
							trailColor: 'C7FFB1',
							backgroundColor: '#626262',
							pathTransitionDuration: 2,
							strokeLinecap: 'butt',
						})}
					/>
				</div>
			</div>
			<div className="flex flex-col pl-4 mt-3 mb-0 ">
				<div style={{ fontSize: '14px' }} className="ml-6 mb-1 font-bold">
					{profile.user.name ? profile.user.name : ''}
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
				{/* <div
          style={{
            backgroundColor: "#F8E169",
            fontWeight: "600",
            fontSize: "10px",
          }}
          className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
        >
          {profile.status}
        </div> */}
				{/* <div
          style={{
            backgroundColor: "#F8E169",
            fontWeight: "600",
            fontSize: "10px",
          }}
          className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
        >
     
        </div> */}
				{profile.status === 'EN CURSO' && !profile.user.isDisabled && (
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
				)}
				{profile.status === 'ENTREGADO' && !profile.user.isDisabled && (
					<div
						style={{ fontWeight: '600', fontSize: '10px' }}
						className="bg-[#C7FFB1] text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
					>
						{profile.status}
					</div>
				)}
				{profile.status === 'PENDIENTE' && !profile.user.isDisabled && (
					<div
						style={{
							backgroundColor: 'orange',
							color: '#626262',
							fontWeight: '600',
							fontSize: '10px',
						}}
						className="text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
					>
						{profile.status}
					</div>
				)}
				{profile.user.isDisabled && (
					<div
						style={{
							backgroundColor: 'rgba(98, 98, 98, 0.2)',
							color: '#626262',
							fontWeight: '600',
							fontSize: '10px',
						}}
						className="text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
					>
            DESHABILITADO
					</div>
				)}
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
