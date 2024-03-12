'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { Spin, Switch } from 'antd'
import BackIcon from 'assets/BackIcon/back-icon'
import { IoIosCloseCircle } from 'react-icons/io'
import DeliveriesAndHistory from './DeliveriesAndHistory'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import 'react-image-crop/dist/ReactCrop.css'
import { setProfileImageFromAdmin, updateDriverState } from 'state/allUsers'
import { useParams } from 'next/navigation'
import { UserState } from 'types/userTypes'
import imageCompression from 'browser-image-compression'

const DriverProfile: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const routerNav = useRouter()
	const params = useParams<{ id: string }>()
	const id = parseInt(params.id, 10) //id del repartidor
	const [showModal, setShowModal] = useState<boolean>(false)
	const [user, setUser] = useState<UserState>()
	const users: UserState[] = useSelector<RootState, UserState[]>(
		(state) => state.allUsers
	) //lista de todos los usuarios
	// const user: UserState = users.filter((user) => user.id == id)[0]; //usuario especifico
	useEffect(() => {
		if (users.length > 0) {
			const temp = users.find((u) => u.id === id)
			if (temp == undefined) routerNav.push('/delivery-drivers')
			setUser(temp)
		}
	}, [users, id])

	const [switchValue, setSwitchValue] = useState<boolean>(true)

	useEffect(() => {
		if (user) setSwitchValue(!user.isDisabled)
	}, [user?.isDisabled])

	const dispatch = useDispatch()
	const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(
		null
	)
	const inputElement = useRef<HTMLInputElement>(null)
	const [base64Imagen, setBase64Imagen] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const compressImage = async (image: File, opts = {}) => {
		// gif图片不压缩
		// if (image.type == "image/gif") {
		// 	return image;
		// }
		const options = {
			maxSizeMB: 0.039,
			maxWidthOrHeight: 300,
			useWebWorker: true,
			maxIteration: 5,
			quality: 0.6,
			...opts,
		}
		try {
			const compressedFile = await imageCompression(image, options)
			console.log(
				'compressedFile instanceof Blob',
				compressedFile instanceof Blob
			) // true
			console.log(
				`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
			) // smaller than maxSizeMB
			return compressedFile
			// await uploadToServer(compressedFile); // write your own logic
		} catch (error) {
			console.log(error)
			return image
		}
	}

	const manejarSeleccionDeImagen = async (event: any) => {
		setError(null)

		if (event.target.files && event.target.files.length > 0) {
			const imagenSeleccionada2 = event.target.files[0]

			console.log('imagen original: ', imagenSeleccionada2)
			const tiposDeImagenPermitidos = ['image/jpeg', 'image/jpg', 'image/png']

			if (!tiposDeImagenPermitidos.includes(imagenSeleccionada2.type)) {
				setError(
					'Formato de imagen no válido. Por favor, selecciona una imagen en formato JPG, JPEG, PNG'
				)
			} else {
				const limiteDeTamañoEnBytes = 1 * 1024 * 1024 // 1 MB
				if (imagenSeleccionada2.size > limiteDeTamañoEnBytes) {
					setError(
						'La imagen seleccionada supera el límite de peso permitido(máx 1mb).'
					)
				} else {
					try {
						const ci = await compressImage(imagenSeleccionada2, {})
						console.log('Imagen comprimida: ', ci)
						console.log('Imagen Original: ', imagenSeleccionada2)
						setImagenSeleccionada(ci)
						const reader = new FileReader()
						reader.onloadend = () => {
							setBase64Imagen(reader.result as string)
						}
						reader.readAsDataURL(ci)
					} catch (error) {
						setError('Ocurrió un error...')
						console.error(error)
					}

					//
				}
			}
		}
	}

	const uploadImage = () => {
		dispatch(setProfileImageFromAdmin({ id: id, profileImage: base64Imagen }))
		setLoading(true)
		return axios
			.post(
				'http://localhost:3001/api/users/profile-image',
				{ profileImage: base64Imagen, driverId: id },
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}

	const removeImage = () => {
		dispatch(setProfileImageFromAdmin({ id: id, profileImage: '' }))
		setLoading(true)
		return axios
			.put(
				'http://localhost:3001/api/users/profile-image',
				{ driverId: id },
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}

	const onClickSwitch = (checked: boolean, e: any) => {
		e.preventDefault()
		//setSwitchValue(checked);
		dispatch(updateDriverState({ id: id, isDisabled: !checked }))
		setLoading(true)
		return axios
			.put(
				'http://localhost:3001/api/users/state',
				{
					driverId: id,
					isDisabled: !checked,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}

	const handleClickOpenPhoto = (e: any) => {
		e.preventDefault()
		setShowModal(true)
	}

	const handleClickClosePhoto = (e: any) => {
		e.preventDefault()
		setShowModal(false)
		setImagenSeleccionada(null)
	}

	const handleClickSaveImage = (e: any) => {
		e.preventDefault()
		uploadImage()
		handleClickClosePhoto(e)
		setImagenSeleccionada(null)
	}

	if (!user) {
		return (
			<div className="flex w-full h-full items-center justify-center">
				<div className="flex flex-row rounded-2xl p-4 text-white">
					<div
						className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
						role="status"
					></div>
				</div>
			</div>
		)
	}
	return (
		<div className="flex flex-col h-[92%] w-full mb-1 p-6 pt-2 pb-0 items-center bg-customBlue text-customBlue">
			{' '}
			{showModal && (
				<div
					className="flex  absolute w-[100%] h-[100%] z-10 "
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
				/>
			)}
			<div
				className="flex relative flex-col w-full  items-center text-indigo-700 m-2 rounded-2xl"
				style={{ backgroundColor: '#c7ffb1' }}
			>
				<div
					className="flex flex-row w-full items-center p-4 pt-2 pb-2  justify-ceter"
					onClick={() => routerNav.back()}
				>
					<BackIcon />
					<div className="flex w-full justify-center px-7">
						<h1>
							<b>Perfil del repartidor</b>
						</h1>
					</div>
				</div>

				<div className="flex flex-row justify-between bg-white w-full rounded-2xl p-4">
					<div className="flex flex-row w-full items-center justify-start">
						{showModal && (
							<div
								className="flex flex-col absolute z-20 flex-col w-[89%] top-4 rounded-2xl "
								style={{ backgroundColor: 'white' }}
							>
								<div className="relative flex w-full items-center justify-center p-4">
									{user.profileImage != '' && !imagenSeleccionada ? (
										<img
											src={user.profileImage}
											style={{ maxHeight: '490px', borderRadius: '10px' }}
										/>
									) : imagenSeleccionada != null ? (
										<img
											src={URL.createObjectURL(imagenSeleccionada)}
											alt="Vista previa de la imagen seleccionada"
											style={{
												maxHeight: '490px',
												padding: '5px',
												borderRadius: '10px',
											}}
										/>
									) : (
										<FaCircleUser style={{ fontSize: '200px' }} />
									)}

									<div className="flex w-[100%] h-[100%] flex-row absolute items-start justify-end p-2">
										<div onClick={handleClickClosePhoto}>
											<IoIosCloseCircle
												style={{
													color: 'red',
													fontSize: '30px',
													opacity: '0.7',
												}}
											/>
										</div>
									</div>
								</div>
								<div className="flex flex-row w-[100%] justify-between">
									<div className="flex items-center justify-center w-[100%]">
										<input
											type="file"
											accept="image/*"
											onChange={manejarSeleccionDeImagen}
											style={{ display: 'none' }}
											ref={inputElement}
										/>
										<div
											className="flex items-center  w-[80px] justify-center  p-1 text-indigo-700 rounded-2xl  transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500 m-3"
											style={{ backgroundColor: '#00ea77' }}
										>
											{!imagenSeleccionada ? (
												<button
													onClick={
														() =>
															inputElement.current &&
                              inputElement.current.click() //esto hace la magia :v
													}
												>
                          Cargar
												</button>
											) : (
												<button onClick={handleClickSaveImage}>Guardar</button>
											)}
										</div>
									</div>
									{user.profileImage != '' && (
										<div className="flex w-[100%]">
											<div
												className="flex items-center w-[90px] justify-center  p-1 text-indigo-700 rounded-2xl  transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500 m-3"
												style={{ backgroundColor: '#ffa1a1' }}
												onClick={removeImage}
											>
                        remover
											</div>
										</div>
									)}
								</div>
								{error && (
									<div className="p-4 text-xs">
										<p style={{ color: 'red' }}>{error}</p>
									</div>
								)}
							</div>
						)}
						<div
							onClick={handleClickOpenPhoto}
							className="w-[60px] h-[60px] overflow-hidden flex items-center  justify-center"
							style={{
								borderRadius: '50px',
								backgroundColor: `${
									user && user.profileImage != '' ? '#bbbbbb' : ''
								}`,
							}}
						>
							{user && user.profileImage != '' ? (
								<img
									src={user.profileImage}
									style={{
										maxWidth: '60px',
										maxHeight: '60px',
									}}
								/>
							) : (
								<FaCircleUser style={{ fontSize: '60px' }} />
							)}
						</div>
						<div className="flex flex-col ml-4" style={{ fontSize: '14px' }}>
							<h2>
								<b>{user && `${user.name} ${user.surname}`}</b>
							</h2>
							<div
								style={{
									backgroundColor: `${switchValue ? '#c7ffb1' : '#bfbfbf'}`,
								}}
								className="flex justify-center items-center pl-2 pr-2 rounded-3xl mt-1"
							>
								{/*title*/}
								<h4 style={{ fontSize: '11px' }}>
									<b>{switchValue ? 'HABILITADO' : 'DESHABILITADO'}</b>
								</h4>
							</div>
						</div>
					</div>

					<div className="flex items-center">
						<Switch
							value={switchValue}
							onChange={onClickSwitch}
							style={{
								backgroundColor: `${switchValue ? '#00ea77' : '#bfbfbf'}`,
								display: loading ? 'none' : 'block',
							}}
						/>
						{loading ? <Spin /> : ''}
					</div>
				</div>
			</div>
			<div className=" w-full h-[70%] pt-0">
				<DeliveriesAndHistory />
			</div>
		</div>
	)
}

export default DriverProfile
