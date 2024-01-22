import React from 'react'
import Image from 'next/image'
import logoIcon from '../assets/icon-logo.svg'

const Navbar = () => {
	return <Image src={logoIcon} alt='logo' width={44} height={30} />
}

export default Navbar
