
'use client';
import React from 'react';
import DeliveriesAndHistory from './DeliveriesAndHistory';
import { useRouter } from "next/navigation";
const StartWorkingDay: React.FC = () => {
 const router = useRouter();
  return (
    <div className='flex flex-col w-full h-screen p-6 pt-3 items-center bg-customBlue text-customBlue'>
      <DeliveriesAndHistory repartos={[]} historial={[]}/>
      <div className='flex justify-center items-center w-full h-12 pt-3'>
        <div
          style={{ backgroundColor: "#00ea77" }}
          className="flex items-center justify-center  p-2 w-10/12 text-indigo-700 rounded-3xl transition-all duration-200 ease-in-out active:bg-green-600"
          onClick={() => router.push("/packages-selection")}
        >
          <h2 className="">Obtener Paquetes</h2>
        </div>
      </div>
    </div>
  );
};

export default StartWorkingDay;
