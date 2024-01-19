import Image from 'next/image'
import logo from '../assets/logo.svg'
import userIcon from '../assets/user-icon.svg'
import passIcon from '../assets/pass-icon.svg'
import eyeCrossedIcon from '../assets/eye-crossed-icon.svg'
import React from 'react'

export default function Login() {
	return (
		<>
			<Image
				src={logo as unknown as string}
				alt='logo'
				width={250}
				height={117}
				style={{ position: 'absolute', top: '122px', left: '55px' }}
			/>
			<form className='flex flex-col items-center relative'>
				<div
					className='relative mb-4'
					style={{ position: 'absolute', top: '289px', left: '30px' }}
				>
					<span className='absolute inset-y-0 left-0 pl-3 flex items-center'>
						<Image
							src={userIcon as unknown as string}
							alt='user icon'
							width={14}
							height={14}
						/>
					</span>
					<input
						type='text'
						className='w-80 h-9 border border-white bg-transparent'
						style={{
							borderRadius: '10px',
							borderWidth: '0.5px',
							paddingLeft: '2.5rem',
						}}
						placeholder='email@contraseña.com'
					/>
				</div>
				<div
					className='relative mb-4'
					style={{ position: 'absolute', top: '334px', left: '30px' }}
				>
					<span className='absolute inset-y-0 left-0 pl-3 flex items-center'>
						<Image
							src={passIcon as unknown as string}
							alt='pass icon'
							width={14}
							height={16}
						/>
					</span>
					<input
						type='password'
						className='w-80 h-9 border border-white bg-transparent relative pr-10'
						style={{
							borderRadius: '10px',
							borderWidth: '0.5px',
							paddingLeft: '2.5rem',
						}}
						placeholder='*******'
					/>
					<span className='absolute inset-y-0 right-0 pr-3 flex items-center'>
						<Image
							src={eyeCrossedIcon as unknown as string}
							alt='eye crossed icon'
							width={20}
							height={20}
						/>
					</span>
				</div>

				<button
					className='w-72 h-7 text-blue-600 border-white'
					style={{
						borderRadius: '13px',
						position: 'absolute',
						top: '404px',
						left: '45px',
						background: '#00EA77',
					}}
				>
          Ingresar
				</button>
				<button
					className='w-72 h-7 text-white border border-white bg-transparent'
					style={{
						borderRadius: '13px',
						position: 'absolute',
						top: '449px',
						left: '45px',
					}}
				>
          Crear cuenta
				</button>
				<p
					style={{
						width: '137px',
						position: 'absolute',
						top: '504px',
						left: '111px',
						fontSize: '12px',
						fontWeight: 300,
						letterSpacing: '0em',
						textAlign: 'left',
						color: 'white',
						whiteSpace: 'nowrap',
					}}
				>
          OLVIDE MI CONTRASEÑA
				</p>
			</form>
		</>
	)
}
