/* eslint-disable no-mixed-spaces-and-tabs */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import PackageIcon from 'assets/Package/package'
import TrashIcon from 'assets/TrashIcon/trashIcon'
import { useSelector } from 'react-redux'
import { RootState } from 'state/store'
import { useParams } from 'next/navigation'
import { UserState } from 'types/userTypes'
import { Reparto } from 'types/packageTypes'
import { useRouter } from 'next/navigation'
import {
	deletePackage,
	getUserPackages,
	getUserPackagesByid,
	removeUserFromPackage,
	updatePackageStatusToOngoing,
} from 'services/dataPackages'

const DeliveriesAndHistory: React.FC = () => {
	const params = useParams<{ id: string }>()
	const idParams = parseInt(params.id, 10) //id del repartidor
	const user: UserState = useSelector<RootState, UserState>(
		(state) => state.user
	) 
	const router = useRouter()
	const [showReps, setShowReps] = useState<boolean>(true)
	const [showRepsHistory, setShowRepsHistory] = useState<boolean>(true)
	const [repsAll, setRepsAll] = useState<Reparto[]>([])
	const [reps, setReps] = useState<Reparto[]>([])
	const [repsHistory, setRepsHistory] = useState<Reparto[]>([])
	const [scrollPos, setScrollPos] = useState<{
		rt: boolean;
		rb: boolean;
		ht: boolean;
		hb: boolean;
	}>({
		rt: true,
		rb: false,
		ht: true,
		hb: false,
	})

	const divHistoryH = useRef<HTMLDivElement>(null)
	const divHistoryP = useRef<HTMLDivElement>(null)
	const divRepsP = useRef<HTMLDivElement>(null)
	const divRepsH = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (
			divHistoryH.current?.clientHeight == divHistoryH.current?.scrollHeight
		) {
			if (showRepsHistory && repsHistory.length > 0)
				setScrollPos((prevState) => ({
					...prevState,
					['hb']: true,
					['ht']: true,
				}))
		} else {
			handleScroll('h')
		}
	}, [
		divHistoryP.current?.clientHeight,
		showReps,
		showRepsHistory,
		repsHistory.length,
		reps.length,
	])

	useEffect(() => {
		if (divRepsH.current?.clientHeight == divRepsH.current?.scrollHeight) {
			if (showReps && reps.length > 0)
				setScrollPos((prevState) => ({
					...prevState,
					['rb']: true,
					['rt']: true,
				}))
		} else {
			handleScroll('r')
		}
	}, [
		divRepsP.current?.clientHeight,
		showReps,
		showRepsHistory,
		repsHistory.length,
		reps.length,
	])

	useEffect(() => {
		if (user) {
			const getP = async () => {
				try {
					const packages = user.isAdmin
						? await getUserPackagesByid(idParams)
						: await getUserPackages()
					setRepsAll(packages)
				} catch (err) {
					console.error('Error al obtener paquetes del usuario:', err)
				}
			}
			getP()
		}
	}, [user?.id])

	useEffect(() => {
		setReps(
			repsAll.filter(
				(rep) => rep.status !== 'ENTREGADO' && rep.status !== 'CANCELADO'
			)
		)
		setRepsHistory(
			repsAll.filter(
				(rep) => rep.status === 'ENTREGADO' || rep.status === 'CANCELADO'
			)
		)
	}, [repsAll])

	const onClickExpand = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setShowReps(!showReps)
	}

	const onClickExpandHistory = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setShowRepsHistory(!showRepsHistory)
	}

	const onClickButtonStart = async (
		repId: number,
		e: React.MouseEvent<HTMLDivElement>
	) => {
		try {
			e.preventDefault()
			e.stopPropagation()
			const resp = await updatePackageStatusToOngoing(repId)
			const repsAux: Reparto[] = repsAll.map((r) =>
				r.id === repId ? { ...r, status: 'EN CURSO' } : r
			)
			setRepsAll(repsAux)
		} catch (err) {
			console.error('Error al iniciar del paquete:', err)
		}
	}

	const onClickButtonRemove = async (
		repId: number,
		e: React.MouseEvent<HTMLDivElement>
	) => {
		try {
			e.preventDefault()
			e.stopPropagation()
			const resp = await removeUserFromPackage(repId)
			const repsAux: Reparto[] = repsAll.filter((rep) => rep.id != repId)
			setRepsAll(repsAux)
		} catch (err) {
			console.error('Error al remover el paquete asignado:', err)
		}
	}

	const onClickButtonDelete = async (
		repId: number,
		e: React.MouseEvent<HTMLDivElement>
	) => {
		try {
			e.preventDefault()
			e.stopPropagation()
			const response = deletePackage(repId)
			const repsAux: Reparto[] = repsAll.filter((r) => r.id != repId)
			setRepsAll(repsAux)
		} catch (err) {
			console.error('Error al eliminar el usuario del paquete:', err)
		}
	}

	const handleScroll = (c: string) => {
		const div = c == 'h' ? divHistoryH.current : divRepsH.current

		if (div && div.clientHeight != div.scrollHeight) {
			const isAtTop = div.scrollTop === 0
			const isAtBottom =
        div.scrollHeight - div.scrollTop <= div.clientHeight + 1
			if (isAtTop && !isAtBottom) {
				setScrollPos((prevState) => ({
					...prevState,
					[`${c}b`]: false,
					[`${c}t`]: true,
				}))
			} else if (isAtBottom && !isAtTop) {
				setScrollPos((prevState) => ({
					...prevState,
					[`${c}b`]: true,
					[`${c}t`]: false,
				}))
			} else if (!isAtBottom && !isAtTop) {
				setScrollPos((prevState) => ({
					...prevState,
					[`${c}b`]: false,
					[`${c}t`]: false,
				}))
			}
		}
	}

	const handleClickPackage = (
		e: React.MouseEvent<HTMLDivElement>,
		repId: number
	) => {
		e.preventDefault()
		if (!user.isAdmin) router.push(`/packages-selection/${repId}`)
	}

	return (
		<div className="flex flex-col w-full h-full items-center bg-customBlue text-customBlue">
			<div
				className="flex bg-white text-indigo-700 w-full m-1 mb-0 p-4 flex-col rounded-2xl"
				style={{
					maxHeight: `${
						!showRepsHistory || repsHistory.length == 0
							? '80%'
							: showRepsHistory && showReps && repsHistory.length >= 2
								? '47%'
								: '64%'
					}`,
				}}
				ref={divRepsP}
			>
				<div className="flex items-center justify-between pl-1 pr-1">
					<h2 className="font-bold">Repartos Pendientes ({reps.length})</h2>
					{reps.length > 0 && (
						<div
							className="flex items-center justify-center p-1 bg-white text-indigo-700 active:bg-gray-500 hover:bg-gray-400 rounded-2xl transition duration-200 ease-in-out"
							onClick={onClickExpand}
						>
							{showReps ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
						</div>
					)}
				</div>
				<div
					className="overflow-y-auto"
					onScroll={() => handleScroll('r')}
					ref={divRepsH}
				>
					{!scrollPos.rt && reps.length > 0 && showReps && (
						<div className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-white via-rgba(255, 255, 255, 0.5) to-transparent"></div>
					)}
					{reps.length !== 0 &&
            showReps &&
            reps.map((rep) => (
            	// eslint-disable-next-line no-mixed-spaces-and-tabs
            	<div
            		className="mt-3 mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
            		key={rep.id}
            		onClick={(e) => handleClickPackage(e, rep.id)}
            	>
            		<div className="flex items-center h-full w-15 justify-center">
            			<PackageIcon />
            			<div className="w-px bg-indigo-400 h-14 ml-1 mr-2"></div>
            		</div>
            		<div className="flex flex-col items-left justify-center h-full text-xs">
            			<h3 className="mb-1">
            				<b>{rep.trackId}</b>
            			</h3>
            			<div className="w-[70%]">
            				<p>{rep.address}</p>
            			</div>
            		</div>
            		<div
            			className="flex items-end flex-col  w-[35%]  h-full "
            			style={{
            				justifyContent: `${!user.isAdmin ? 'space-around' : ''}`,
            				paddingTop: `${!user.isAdmin ? '5px' : '12px'}`,
            			}}
            		>
            			<div
            				style={{
            					backgroundColor: `${
            						rep.status === 'PENDIENTE' ? '#aa9cfa' : '#f8e169'
            					}`,
            				}}
            				className={
            					'flex justify-center w-max items-center pl-2 pr-3 rounded-l-xl rounded-tr'
            				}
            			>
            				<h4 style={{ fontSize: '11px' }}>
            					<b>{rep.status.toUpperCase()}</b>
            				</h4>
            			</div>

            			<div className="flex ">
            				{rep.status === 'PENDIENTE' && !user.isAdmin && (
            					<div
            						className="flex items-center justify-center  p-1 w-16 text-indigo-700 rounded-2xl transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500"
            						style={{ backgroundColor: '#00ea77' }}
            						onClick={(e) => onClickButtonStart(rep.id, e)}
            					>
            						<h4 style={{ fontSize: '12px' }}>Iniciar</h4>
            					</div>
            				)}
            				{!user.isAdmin && (
            					<div
            						className="flex items-center justify-center p-2 bg-white text-indigo-700 rounded-2xl transition duration-200 ease-in-out hover:bg-gray-400 mr-1 active:bg-gray-500"
            						onClick={(e) => onClickButtonRemove(rep.id, e)}
            					>
            						<TrashIcon />
            					</div>
            				)}
            			</div>
            		</div>
            	</div>
            ))}
				</div>
				<div className="flex h-[0px]">
					{!scrollPos.rb && reps.length > 0 && showReps && (
						<div
							className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-transparent via-white to-white"
							style={{ transform: 'translateY(-20px)' }}
						></div>
					)}
				</div>
			</div>
			<div
				className="flex bg-white text-indigo-700 w-full m-4 mb-1 p-4  flex-col rounded-2xl"
				style={{
					maxHeight: `${
						!showReps || reps.length == 0
							? '81%'
							: showRepsHistory && showReps && reps.length >= 2
								? '47%'
								: '64%'
					}`,
				}}
				ref={divHistoryP}
			>
				<div className="flex items-center justify-between pl-1 pr-1">
					<h2 className="font-bold">
            Historial de repartos ({repsHistory.length})
					</h2>
					{repsHistory.length > 0 && (
						<div
							className="flex items-center justify-center p-1 bg-white text-indigo-700 active:bg-gray-500 hover:bg-gray-400 rounded-2xl transition duration-200 ease-in-out"
							onClick={onClickExpandHistory}
						>
							{showRepsHistory ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
						</div>
					)}
				</div>
				{showRepsHistory && repsHistory.length !== 0 && (
					<div className="pl-2" style={{ fontSize: '13px' }}>
						<p>
							{repsHistory.filter((rep) => rep.status === 'ENTREGADO').length}{' '}
              pedidos entregados
						</p>
						<p>
							{repsHistory.filter((rep) => rep.status === 'CANCELADO').length}{' '}
              pedidos cancelados
						</p>
					</div>
				)}

				<div
					className="overflow-y-auto mt-1 rounded-[10px]"
					ref={divHistoryH}
					onScroll={() => handleScroll('h')}
				>
					{!scrollPos.ht && repsHistory.length > 0 && showRepsHistory && (
						<div className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-white via-rgba(255, 255, 255, 0.5) to-transparent"></div>
					)}
					{repsHistory.length !== 0 &&
            showRepsHistory &&
            repsHistory.map((rep) => (
            	<div
            		className=" mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
            		key={rep.id}
            		style={{
            			marginTop: `${rep == repsHistory[0] ? '' : '12px'}`,
            		}}
            	>
            		<div className="flex items-center h-full w-15 justify-center">
            			<PackageIcon />
            			<div className="w-px bg-indigo-400 h-14 ml-1 mr-2"></div>
            		</div>
            		<div className="flex w-6/12 flex-col justify-center h-full text-xs">
            			<h3 className="mb-1">
            				<b>{rep.trackId}</b>
            			</h3>
            			<div className="w-[70%]">
            				<p>{rep.address}</p>
            			</div>
            		</div>
            		<div className="flex items-end flex-col  w-35 justify-between h-full">
            			<div
            				style={{
            					fontSize: '11px',
            					backgroundColor: `${
            						rep.status === 'ENTREGADO' ? '#c7ffb1' : '#FFA1A1'
            					}`,
            				}}
            				className={
            					'flex justify-center w-max items-center pl-2 pr-3 mt-3 rounded-l-xl rounded-tr'
            				}
            			>
            				<h4>
            					<b>{rep.status.toUpperCase()}</b>
            				</h4>
            			</div>
            			{user.isAdmin && (
            				<div
            					className="flex items-center justify-center p-2 bg-white text-indigo-700 rounded-2xl transition duration-200 ease-in-out hover:bg-gray-400 mr-3 active:bg-gray-500"
            					onClick={(e) => onClickButtonDelete(rep.id, e)}
            					style={{ marginBottom: '5px' }}
            				>
            					<TrashIcon />
            				</div>
            			)}
            		</div>
            	</div>
            ))}
				</div>
				<div className="flex h-[0px]">
					{!scrollPos.hb && repsHistory.length > 0 && showRepsHistory && (
						<div
							className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-transparent via-white to-white"
							style={{ transform: 'translateY(-20px)' }}
						></div>
					)}
				</div>
			</div>
		</div>
	)
}
export default DeliveriesAndHistory
