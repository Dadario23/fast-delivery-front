import React from 'react';
import userImage from '../assets/user-image.png';
import Image from 'next/image';
const CardAdmin = () => {
  return (
    <>
      <div className='absolute w-[300px] h-[495px] top-[120px] left-[30px] border rounded-[10px] bg-[#FFFFFF] z-20'></div>
      <div className='absolute top-[135px] left-[45px] z-20'>
        <Image
          className='w-[57px] h-[57px] inline-block rounded-full ring-2 ring-white'
          src={userImage}
          alt=''
        />
      </div>
      <span className='absolute w-[95px] h-[15px] top-[145px] left-[117px] font-bold text-[#3d1df3] text-[14px] leading-[15px] z-30'>
        ¡Hola Admin!
      </span>
      <span className='absolute w-[172px] h-[15px] top-[165px] left-[117px] font-normal text-[#3d1df3] text-[12px] leading-[15px] z-40'>
        Estos son los pedidos del día
      </span>
    </>
  );
};

export default CardAdmin;
