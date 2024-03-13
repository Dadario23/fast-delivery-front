'use client'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import logo from '../../../assets/logo.svg'
import passIcon from '../../../assets/pass-icon.svg'
import eyeCrossedIcon from '../../../assets/eye-crossed-icon.svg'
import eyeIcon from '../../../assets/eye-icon.svg'
import { useRouter } from 'next/navigation'
import { mailResetPassword } from 'services/dataAuth'

interface ResetPasswordProps {
	params: {
		token: string;
	};
}
interface FormData {
	password: string;
	confirmPassword: string;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({ params }) => {
	const router = useRouter()
	const [formData, setFormData] = useState<FormData>({
		password: '',
		confirmPassword: '',
	})

	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			alert('Las contraseñas no coinciden')
			return
		}
		try {
			await mailResetPassword(params.token, formData.password)
			setTimeout(() => router.push('/'), 2000)
		} catch (error) {
			console.error(error)
			alert(error)
		}
	}

	return (
		<>
			<Image
				src={logo}
				alt="logo"
				width={250}
				height={117}
				className="absolute top-[122px] left-[55px]"
			/>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center relative"
			>
				<div className="absolute mb-4 top-[280px] left-[30px]">
					<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
						<Image src={passIcon} alt="pass icon" width={14} height={16} />
					</span>
					<input
						type={showPassword ? 'text' : 'password'}
						className="w-[300px] h-[35px] border pl-[44px] rounded-[10px] border-[#fff] bg-transparent"
						placeholder="Contraseña"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<span className="absolute inset-y-0 right-0 pr-3 flex items-center">
						<Image
							src={showPassword ? eyeIcon : eyeCrossedIcon}
							alt="eye icon"
							width={20}
							height={20}
							onClick={togglePasswordVisibility}
							style={{ cursor: 'pointer' }}
						/>
					</span>
				</div>

				<div className="absolute mb-4 top-[325px] left-[30px]">
					<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
						<Image src={passIcon} alt="pass icon" width={14} height={16} />
					</span>
					<input
						type={showPassword ? 'text' : 'password'}
						className="w-[300px] h-[35px] border pl-[44px] rounded-[10px] border-[#fff] bg-transparent"
						placeholder="Confirmar Contraseña"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
					<span className="absolute inset-y-0 right-0 pr-3 flex items-center">
						<Image
							src={showPassword ? eyeIcon : eyeCrossedIcon}
							alt="eye icon"
							width={20}
							height={20}
							onClick={togglePasswordVisibility}
							style={{ cursor: 'pointer' }}
						/>
					</span>
				</div>

				<button
					type="submit"
					className="absolute w-[270px] h-[30px] top-[404px] left-[45px]  border-white rounded-[13px] bg-[#00EA77] text-[#3D1DF3]"
				>
          Ingresar
				</button>
				<p className=" absolute text-[12px] top-[370px]">
          Ingresá tu nueva contraseña.
				</p>
			</form>
		</>
	)
}

export default ResetPassword
