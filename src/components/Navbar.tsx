import React from 'react'
import Image from 'next/image'
import logoIcon from '../assets/icon-logo.svg'
import logoutIcon from '../assets/logout-icon.svg'

const Navbar = () => {
	return (
		<nav className='w-[360px] h-[50px]'>
			<div className='pl-[30px] pt-[10px]'>
				<Image src={logoIcon} alt='logo' width={44} height={30} />
			</div>
			<Image
				className='absolute top-[12px] left-[305px] text-[#fff]'
				src={logoutIcon}
				alt='logo'
				width={25}
				height={26}
			/>
		</nav>
	)
}

export default Navbar
