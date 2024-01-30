// "use client"
// import React from "react";
// import BackIcon from "assets/BackIcon/back-icon";
// import PackageIcon from "assets/Package/package";
// import TrashIcon from "assets/TrashIcon/trashIcon";
// import ArrowDown from "assets/ArrowDown/arrowDown";

// import "tailwindcss/tailwind.css";

// const packages = [
//   {
//     number: "#0A235",
//     title: "Castillo 1356,",
//     location: "CABA",
//   },
//   {
//     number: "#0H167",
//     title: "Av Carabobo y Rivadavia,",
//     location: "CABA",
//   },
//   {
//     number: "#0H166",
//     title: "Mendoza 1810,",
//     location: "CABA",
//   },
//   {
//     number: "#0B540",
//     title: "Scalabrini Ortiz 5073,",
//     location: "CABA",
//   },
// ];

// const PackagesOffice: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] bg-[#C7FFB1] mt-[20px] h-[74px] relative ">
//       <div className="w-full h-[55px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
//         <div className="ml-3">
//           <BackIcon />
//         </div>
//         <h1 className=" font-bold text-[#3d1df3] mr-10 flex-grow text-center">
//           Paquetes
//         </h1>
//       </div>
//       <div className="bg-white rounded-xl w-[300px] h-[495px] z-20">
//         <h1 className="font-bold text-[#3d1df3] text-center text-[14px] ml-[-14.2rem] mt-3">
//           Enero
//         </h1>
//         <div
//             className="absolute border border-[#8976F8] h-[50px] w-[41px] ml-[15.3rem] top-[64px] rounded-[10px]"
//           ><p className=" absolute text-[#3d1df3] text-center text-[12px] mt-[8px] ml-[9px]">mie</p> <p className=" absolute font-bold text-[#3d1df3] text-center text-[16px] mt-[21px] ml-[10px]">03</p>
//         </div>
//         <hr className="border-t border-[#CAC0FF] mb-4 w-[230px] h-[0.5px] ml-4" />
//         <h1 className=" relative font-bold text-[#3d1df3] text-center text-[12px] ml-[-11.6rem] top-[10px]">
//           523 paquetes
//         </h1>
//         {packages.map((packageItem, index) => (
//           <div
//             className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px]"
//             key={index}
//           >
//             <div className=" absolute ml-[-1px] mt-[20px]"><PackageIcon/></div>
//             <div className=" absolute ml-[15rem] mt-[32px]"><TrashIcon/></div>
//              <div className=" absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
//               {packageItem.number}
//             </div>
//             <div className=" absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
//               {packageItem.title}
//             </div>
//             <div className=" absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[50px]">
//               {packageItem.location}
//               </div>
//             <div className="bg-[#CAC0FF] absolute w-[1px] h-[60px] left-[39px] top-[0.6rem]"></div>
//           </div>
//         ))}
//         <div className=" absolute ml-[140px] mt-[34px]"><ArrowDown/></div>
//       </div>
//     </div>
//   );
// };

// export default PackagesOffice;

'use client'
import React, { useState } from 'react'
import BackIcon from 'assets/BackIcon/back-icon'
import PackageIcon from 'assets/Package/package'
import TrashIcon from 'assets/TrashIcon/trashIcon'
import ArrowDown from 'assets/ArrowDown/arrowDown'
import 'tailwindcss/tailwind.css'

const packages = [
	{
		number: '#0A235',
		title: 'Castillo 1356,',
		location: 'CABA',
	},
	{
		number: '#0H167',
		title: 'Av Carabobo y Rivadavia,',
		location: 'CABA',
	},
	{
		number: '#0H166',
		title: 'Mendoza 1810,',
		location: 'CABA',
	},
	{
		number: '#0B540',
		title: 'Scalabrini Ortiz 5073,',
		location: 'CABA',
	},
]

const packagesTwo = [
	{
		number: '#0A452',
		title: 'Alvear 1356,',
		location: 'CABA',
	},
	{
		number: '#0L110',
		title: 'Av Carabobo y Rivadavia,',
		location: 'CABA',
	},
	{
		number: '#0O700',
		title: 'Mendoza 1810,',
		location: 'CABA',
	},
	{
		number: '#0Y240',
		title: 'Scalabrini Ortiz 5073,',
		location: 'CABA',
	},
]

const PackagesOffice: React.FC = () => {
	const [expanded, setExpanded] = useState<boolean>(false)

	const toggleExpansion = () => {
		setExpanded(!expanded)
	}

	return (
		<div className="flex items-center justify-center flex-wrap rounded-xl mx-[30px] bg-[#C7FFB1] mt-[20px] h-[555px] relative ">
			<div className="w-full h-[55px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
				<div className="ml-3">
					<BackIcon />
				</div>
				<h1 className="font-bold text-[#3d1df3] mr-10 flex-grow text-center">
          Paquetes
				</h1>
			</div>
			<div className="bg-white rounded-xl w-[300px] h-[495px] z-20 relative overflow-hidden">
				<h1 className="font-bold text-[#3d1df3] text-center text-[14px] ml-[-14.2rem] mt-3">
          Enero
				</h1>
				<div className="absolute border border-[#8976F8] h-[50px] w-[41px] ml-[15.4rem] top-[10px] rounded-[10px] transition-all duration-300 ease-in-out">
					<p className="absolute text-[#3d1df3] text-center text-[12px] mt-[8px] ml-[9px]">
            mie
					</p>{' '}
					<p className="absolute font-bold text-[#3d1df3] text-center text-[16px] mt-[21px] ml-[10px]">
            03
					</p>
				</div>
				<hr className="border-t border-[#CAC0FF] mb-4 w-[230px] h-[0.5px] ml-4" />
				<h1 className=" realtive font-bold text-[#3d1df3] text-center text-[12px] ml-[-11.6rem] mt-[24px]">
					{/* {packages.length + packagesTwo.length} paquetes */}
        523 paquetes
				</h1>
				<div style={{ position: 'relative', top: '-5px' }}>
					{expanded
						? packagesTwo.map((packageItem, index) => (
							<div
								className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px] transition-all duration-300 ease-in-out"
								key={index}
							>
								<div className="absolute ml-[-1px] mt-[20px]">
									<PackageIcon />
								</div>
								<div className="absolute ml-[15rem] mt-[32px]">
									<TrashIcon />
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
									{packageItem.number}
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
									{packageItem.title}
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[50px]">
									{packageItem.location}
								</div>
								<div className="bg-[#CAC0FF] absolute w-[1px] h-[60px] left-[39px] top-[0.6rem]"></div>
							</div>
						))
						: packages.map((packageItem, index) => (
							<div
								className="relative border border-[#8976F8] h-[80px] w-[270px] ml-[15px] mb-[10px] top-[25px] rounded-[10px] transition-all duration-300 ease-in-out"
								key={index}
							>
								<div className="absolute ml-[-1px] mt-[20px]">
									<PackageIcon />
								</div>
								<div className="absolute ml-[15rem] mt-[32px]">
									<TrashIcon />
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] font-semibold ml-[50px] mt-[15px]">
									{packageItem.number}
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[35px]">
									{packageItem.title}
								</div>
								<div className="absolute text-[#3d1df3] text-[12px] ml-[50px] mt-[50px]">
									{packageItem.location}
								</div>
								<div className="bg-[#CAC0FF] absolute w-[1px] h-[60px] left-[39px] top-[0.6rem]"></div>
							</div>
						))}
				</div>
				<div
					className="absolute ml-[140px] mt-[30px]"
					onClick={toggleExpansion}
				>
					<ArrowDown />
				</div>
			</div>
		</div>
	)
}

export default PackagesOffice
