import React from 'react'
import 'tailwindcss/tailwind.css'
import Eye, { EyeBlocked } from '../assets/Eye/eye'
import CameraIcon from 'assets/CameraIcon/camera-icon'
import BackIcon from 'assets/BackIcon/back-icon'
const CreateAccountForm: React.FC = () => {
	return (
		<div className="flex items-center justify-center flex-wrap  rounded-xl mx-[30px] mt-[10px] mb-[60px] bg-[#C7FFB1] relative ">
			<div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
				<div className="ml-3">
					<BackIcon />
				</div>
				<h2 className="text-[#3d1df3] mr-10 flex-grow text-center">
          Creá tu cuenta
				</h2>
			</div>
			<div className="bg-white rounded-xl z-20 text-[85%]">
				<form className="w-[19rem] pl-5">
					<div className="w-[95px] h-[95px] mb-4 mt-5 ml-[88px] flex items-center justify-center border border-[#3d1df3] rounded-full">
						<CameraIcon />
					</div>
					<input
						type="text"
						placeholder="Nombre"
						className="w-[94%] h-495 mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
					/>
					<input
						type="text"
						placeholder="Apellido"
						className="w-[94%] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
					/>
					<input
						type="text"
						placeholder="Email@contraseña"
						className="w-[94%] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
					/>
					<div className="relative items-center">
						<input
							type="text"
							placeholder="*********"
							className="w-[94%] mb-2 p-2 border border-[#3d1df3] rounded-xl relative placeholder-[#3d1df3]  "
						/>
						<div className="absolute right-7 top-2">
							<EyeBlocked />
						</div>
					</div>
					<div className="relative">
						<input
							type="text"
							placeholder="Confirmar contraseña"
							className="w-[94%] mb-2 p-2 border-[0.5px] border-[#3d1df3] rounded-xl placeholder-[#3d1df3] "
						/>
						<div className="absolute right-7 top-2">
							<Eye />
						</div>
					</div>
					<button className="w-[270px] h-[30px] mt-4 mb-2 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center ">
            Crear
					</button>
					<h2 className="mb-2 flex items-center justify-center text-[#3d1df3] text-[12px]">
            ¿Ya tenés una cuenta?
					</h2>
					<button className="w-[270px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3]  rounded-full pl-50 flex items-center justify-center ">
            Iniciar sesión
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateAccountForm
