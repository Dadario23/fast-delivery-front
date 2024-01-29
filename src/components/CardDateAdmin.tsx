import Image from 'next/image';
import React from 'react';
import arrowLeftIcon from '../assets/arrow-left-icon.svg';
import arrowRigthIcon from '../assets/arrow-rigth-icon.svg';

const CardDateAdmin = () => {
  return (
    <>
      <Image
        src={arrowLeftIcon}
        alt=''
        className='absolute w-[17px] h-[13px] top-[255px] left-[48px] z-40'
      />
      <div className='absolute w-[270px] h-[95px] top-[201px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40'></div>
      <hr className='absolute top-[231px] left-[55px] border-t border-gray-400  w-[250px] h-[0.5px] opacity-50 z-40' />
      <span className='absolute w-[41px] h-[15px] top-[210px] left-[55px] text-[14px] leading-[15px] text-[#3d1df3] font-bold z-40'>
        Enero
      </span>
      <div className='absolute w-[41px] h-[50px] top-[236px] left-[68px] z-[40] border-[0.5px] border-solid border-[#3D1DF3] rounded-[10px]'></div>
      <span className='absolute w-[19px] h-[15px] top-[246px] left-[79px]  text-[12px] leading-[15px] text-[#3d1df3] font-normal z-40'>
        lun
      </span>
      <span className='absolute w-[17px] h-[15px] top-[261px] left-[80px] text-[16px] font-bold leading-[15px] z-40 text-[#3d1df3] '>
        01
      </span>
      <div className='absolute w-[41px] h-[50px] top-[236px] left-[114px] z-[40] border-[0.5px] border-solid border-[#3D1DF3] rounded-[10px]'></div>
      <span className='absolute w-[19px] h-[15px] top-[246px] left-[122px]  text-[12px] leading-[15px] text-[#3d1df3] font-normal z-40'>
        mar
      </span>
      <span className='absolute w-[17px] h-[15px] top-[261px] left-[124px] text-[16px] font-bold leading-[15px] z-40 text-[#3d1df3] '>
        02
      </span>
      <div className='absolute w-[41px] h-[50px] top-[236px] left-[160px] z-[40] border-[0.5px] border-solid border-[#3D1DF3] rounded-[10px] bg-[#C7FFB1]'></div>
      <span className='absolute w-[19px] h-[15px] top-[246px] left-[170px]  text-[12px] leading-[15px] text-[#3d1df3] font-normal z-40'>
        mie
      </span>
      <span className='absolute w-[17px] h-[15px] top-[261px] left-[170px] text-[16px] font-bold leading-[15px] z-40 text-[#3d1df3] '>
        03
      </span>
      <div className='absolute w-[41px] h-[50px] top-[236px] left-[206px] z-[40] rounded-[10px] bg-[#62626233]'></div>
      <span className='absolute w-[19px] h-[15px] top-[246px] left-[217px]  text-[12px] leading-[15px] text-[#626262] font-normal z-40'>
        jue
      </span>
      <span className='absolute w-[17px] h-[15px] top-[261px] left-[215px] text-[16px] font-bold leading-[15px] z-40 text-[#626262] '>
        04
      </span>
      <div className='absolute w-[41px] h-[50px] top-[236px] left-[252px] z-[40] rounded-[10px] bg-[#62626233]'></div>
      <span className='absolute w-[19px] h-[15px] top-[246px] left-[263px]  text-[12px] leading-[15px] text-[#626262] font-normal z-40'>
        vie
      </span>
      <span className='absolute w-[17px] h-[15px] top-[261px] left-[262px] text-[16px] font-bold leading-[15px] z-40 text-[#626262] '>
        05
      </span>
      <Image
        src={arrowRigthIcon}
        alt=''
        className='absolute w-[17px] h-[13px] top-[255px] left-[296px] z-40'
      />
    </>
  );
};

export default CardDateAdmin;
