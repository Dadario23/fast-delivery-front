'use client'
import React, { useEffect, useState } from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import DateSquare from 'assets/DateSquare/DateSquare'
import Card from 'commons/Card'
import MoreArrow from 'assets/moreArrow'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAllPackages } from 'services/dataPackages'
import { getDataDeliverys } from '../services/dataUsers'
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
		name: string;
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
interface LastPackagesByUser {
	[userId: number]: Package;
}
type PackagesByUser = { [user: string]: number };

const DeliveryDrivers = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [firstUserIndex, setFirstUserIndex] = useState<number>(0)
	const [ongoingPackage, setOngoingPackage] = useState<Package[]>([])

	const params = `${searchParams}`
	const paramsDate: string = params.substring(5)
	const parts: string[] = paramsDate.split('-')
	const reversedDate: string = `${parts[2]}-${parts[1].padStart(2, '0')}-${
		parts[0]
	}` 
	const daysOfWeek = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab']
	const dateObj = new Date(reversedDate)
	let dayOfWeekIndex = dateObj.getDay() + 1
	if (dayOfWeekIndex === 7) dayOfWeekIndex = 0
	const dayOfWeek = daysOfWeek[dayOfWeekIndex]
	const dayOfMonth = dateObj.getDate() + 1
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	]
	const month = months[dateObj.getMonth()]

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const dataUsers: any = await getDataDeliverys(reversedDate)
				if (dataUsers.totalDeliveryUsers.length < 1) {
					alert('NO SE ENCONTRARON REPARTIDORES EN ESTA FECHA')
				}
				const usersByDateAll = dataUsers.totalDeliveryUsers

				const data = await getAllPackages()

				if (data.length > 1) {
					const assignedPackages = data.filter(
						(paq: any) =>
							paq.date.slice(0, 10) === reversedDate && paq.userId !== null
					)

					const total: PackagesByUser = {}
					const delivered: PackagesByUser = {}

					assignedPackages.forEach((paq: Package) => {
						if (!total[paq.user.id]) {
							total[paq.user.id] = 0
							delivered[paq.user.id] = 0
						}

						total[paq.user.id]++

						if (paq.status === 'ENTREGADO') {
							delivered[paq.user.id]++
						}
					})

					assignedPackages.forEach((paq: Package) => {
						paq.total = total[paq.user.id] || 0
						paq.delivered = delivered[paq.user.id] || 0
					})

					const lastPackages: LastPackagesByUser = assignedPackages.reduce(
						(prev: LastPackagesByUser, current: Package) => {
							if (
								current.status === 'EN CURSO' &&
                (!prev[current.user.id] ||
                  prev[current.user.id]?.status !== 'EN CURSO')
							) {
								prev[current.user.id] = current
							} else if (
								current.status === 'PENDIENTE' &&
                (!prev[current.user.id] ||
                  (prev[current.user.id]?.status !== 'EN CURSO' &&
                    prev[current.user.id]?.status !== 'PENDIENTE'))
							) {
								prev[current.user.id] = current
							} else if (
								!prev[current.user.id] ||
                prev[current.user.id]?.date < current.date
							) {
								prev[current.user.id] = current
							}
							return prev
						},
						{}
					)

					const lastPackagesArray = Object.values(lastPackages)
					const usersAndassignedUsers = usersByDateAll.filter(
						(user: UserState) => {
							return !lastPackagesArray.some((pak) => pak.userId === user.id)
						}
					)

					setOngoingPackage(lastPackagesArray.concat(usersAndassignedUsers))
				} else {
					setOngoingPackage(usersByDateAll)
				}
			} catch (error) {
				console.error('Error al obtener los paquetes:', error)
			}
		}
		fetchPackages()
	}, [])

	const handleClickNext = () => {
		if (firstUserIndex + 4 <= ongoingPackage.length) {
			setFirstUserIndex((prevIndex) => prevIndex + 4)
		} else {
			setFirstUserIndex(0)
		}
	}

	const visibleUsersWithPackages = ongoingPackage.slice(
		firstUserIndex,
		firstUserIndex + 4
	)

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
				<h1 className="text-[#3d1df3] font-bold mt-3 mb-[1px] ml-4  ">
					{month}
				</h1>
				<div className="border-t border-dotted border-[#3d1df3] text-[#3d1df3] border-w-270 mt-[2px] mx-4 mr-14 relative z-[1]"></div>
				{visibleUsersWithPackages.length > 1 ? (
					visibleUsersWithPackages.map((profile, index) => {
						return (
							<div
								key={index}
								className="mt-4 mx-4 border-b border-dotted border-[#3d1df3] border-w-270"
							>
								<Card profile={profile} />
							</div>
						)
					})
				) : (
					<div className="mt-4 mx-4  border-b border-dotted border-[#3d1df3] border-w-270">
						<Card profile={ongoingPackage[0]} />
					</div>
				)}
			</div>
			<div className="absolute right-4 top-[60px] z-40 text-[12px] shadow-md rounded-[10px] ">
				<DateSquare day={dayOfWeek} date={dayOfMonth} />{' '}
			</div>
			<div className="absolute bottom-3" onClick={handleClickNext}>
				<MoreArrow />{' '}
			</div>
		</div>
	)
}

export default DeliveryDrivers
