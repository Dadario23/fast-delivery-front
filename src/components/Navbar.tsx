'use client'
import React from 'react'
import Image from 'next/image'
import logoIcon from '../assets/icon-logo.svg'
import logoutIcon from '../assets/logout-icon.svg'
import { useRouter } from 'next/navigation'
import { dataLogout } from 'services/dataAuth'
import { useDispatch } from 'react-redux'
import { clear } from 'state/user'


const Navbar = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const clickLogout = async () => {
		dispatch(clear(null))
		try {
			await dataLogout()
			router.push('/')
		} catch (error) {
			console.error('Error al cerrar sesión:', error)
		}
	}
	return (
		<nav className="relative w-[360px] h-[50px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.25)]">
			<div className="pl-[30px] pt-[10px]">
				<Image src={logoIcon} alt="logo" width={44} height={30} />
			</div>
			<Image
				className="absolute top-[12px] left-[305px] text-[#fff]"
				src={logoutIcon}
				alt="logo"
				width={32}
				height={26}
				onClick={clickLogout}
			/>
		</nav>
	)
}

export default Navbar
