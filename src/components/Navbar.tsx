import React from 'react'
import Image from 'next/image'
import logoIcon from '../assets/icon-logo.svg'

const Navbar = () => {
	return (
		<nav className='w-[360px] h-[50px]'>
			<div className='pl-[30px] pt-[10px]'>
				<Image src={logoIcon} alt='logo' width={44} height={30} />
			</div>
		</nav>
	)
}

export default Navbar
