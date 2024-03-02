'use client'
import React from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import { useRouter } from 'next/navigation'

import 'react-datepicker/dist/react-datepicker.css'

const Affidavit = () => {
	const router = useRouter()

	return (
		<div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative">
			<div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1]">
				<div className="ml-3" onClick={() => router.back()}>
					<BackIcon />
				</div>
				<h2 className="text-[#3d1df3] mr-10 flex-grow text-center">
          Declaración jurada
				</h2>
			</div>
			<div className="bg-white rounded-xl z-20 text-[80%] w-[19rem] pt-[1rem]">
				<div className="text-[#3d1df3] text-wrap pl-4">
					<h3 className="text-[11px] mt-4">Requerido* </h3>
					<div className="text-wrap text-center text-[12px] leading-tight align-center w-[270px] h-[90px] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Ha consumido bebidas alcohólicas en las últimas 12 horas?{' '}
						<div className="flex justify-self-stretch space-x-3 ml-12 mt-2">
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                Sí
							</button>
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                No
							</button>
						</div>
					</div>
					<h3 className="text-[11px]">Requerido* </h3>
					<div className="text-wrap text-center leading-tight text-[12px] align-center w-[270px] h-[125px] pt-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Usted está haciendo uso de algún medicamento psicoactivo?
						<p className="text-[10px] leading-normal italic mt-1 mb-2">
							{' '}
              por ejemplo tranquilizantes, antigripales, antialérgicos o para
              insomnio.
						</p>
						<div className="flex justify-self-stretch space-x-3 ml-14 mt-1">
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                Sí
							</button>
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                No
							</button>
						</div>
					</div>
					<h3 className="text-[11px] mt-2">Requerido* </h3>
					<div className="text-wrap text-center leading-tight text-[12px] align-center w-[270px] h-[100px] mb-2 p-2 border border-[#3d1df3] rounded-xl placeholder-[#3d1df3] focus:outline-none">
            ¿Tiene usted algún tipo de problema familiar, emocional o de
            cualquier tipo que lo distraiga ?
						<div className="flex justify-self-stretch space-x-3 ml-12 mt-1">
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                Sí
							</button>
							<button
								className="w-[74px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3] text-[14px] rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
								onClick={() => router.push('/login')}
							>
                No
							</button>
						</div>
					</div>
					<button className="w-[270px] h-[30px] text-[14px] mt-[20px] mb-4 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center hover:bg-white hover:border border-[#00ea77]">
            Continuar
					</button>
				</div>
			</div>
		</div>
	)
}
export default Affidavit
