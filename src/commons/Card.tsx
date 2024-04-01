import React from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { percentageCalculator } from 'utils/utils'
import { FaCircleUser } from 'react-icons/fa6'
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
	user: {
		id: number;
		name: string | undefined | null;
		email: string;
		isDisabled: boolean;
		profileImage: string;
	};
	userId: number;
	percentage: number;
	total: number;
	delivered: number;
}
export interface UserState {
	id: number;
	email: string;
	isAdmin: boolean;
	name: string;
	surname: string;
	isDisabled: boolean;
	profileImage: string;
}
const Card = ({ profile }: { profile: Package | UserState }) => {
	const router = useRouter()
	if (!profile) {
		return null
	}

	if ('user' in profile) {
		profile.percentage = percentageCalculator(profile.delivered, profile.total)
	}

	return (
		<div
			className=" flex space-x-1 mr-2 relative"
			onClick={() => {
				if ('user' in profile) {
					router.push(`/driver-profile/${profile.user.id}`)
				} else {
					router.push(`/driver-profile/${profile.id}`)
				}
			}}
		>
			<div className="mb-2 text-[#3d1df3] font-[16px] font-semibold">
				<div
					style={{
						width: '71px',
						height: '73px',
						color: '#3d1df3',
					}}
				>
					{'user' in profile && !profile.user.isDisabled ? (
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
					) : (
						<CircularProgressbar
							value={0}
							text={'0%'}
							styles={buildStyles({
								pathColor: '#00EA77',
								textColor: '#3d1df3',
								trailColor: 'C7FFB1',
								backgroundColor: '#626262',
								pathTransitionDuration: 2,
								strokeLinecap: 'butt',
							})}
						/>
					)}
				</div>
			</div>
			{'user' in profile ? (
				<div className="flex flex-col pl-4 mt-3 mb-0 ">
					<div style={{ fontSize: '14px' }} className="ml-6 mb-1 font-bold">
						{profile.user.name ? profile.user.name : ''}
					</div>

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
			) : (
				<div className="flex flex-col pl-4 mt-3 mb-0 ">
					<div style={{ fontSize: '14px' }} className="ml-6 mb-1 font-bold">
						{profile.name ? profile.name : ''}
					</div>
					{profile.isDisabled && (
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
			)}
			{'user' in profile ? (
				profile.user.profileImage ? (
					<img
						src={profile.user.profileImage}
						alt="foto"
						style={{ height: '40px', width: '40px' }}
						className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
					/>
				) : (
					<FaCircleUser
						style={{ height: '40px', width: '40px' }}
						className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
					/>
				)
			) : profile.profileImage ? (
				<img
					src={profile.profileImage}
					alt="foto"
					style={{ height: '40px', width: '40px' }}
					className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
				/>
			) : (
				<FaCircleUser
					style={{ height: '40px', width: '40px' }}
					className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
				/>
			)}
		</div>
	)
}

export default Card
