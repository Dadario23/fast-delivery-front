import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  GreenCircle,
  FullCircle,
  Circle80,
  Circle20,
  Circle0,
} from "assets/green-circle";

type Profile = {
  name: string;
  percentage: any;
  status: string;
  image: string;
};

const Card = ({ profile, id }: { profile: Profile; id: string }) => {
  const router = useRouter();
  return (
    <div
      className=" flex space-x-1 mr-2 relative"
      onClick={() => router.push("/delivery-profile")}
    >
      <div className="mb-2 text-[#3d1df3]">
        {profile.percentage === "52%" && (
          <GreenCircle percentage={profile.percentage} />
        )}
        {profile.percentage === "100%" && (
          <FullCircle percentage={profile.percentage} />
        )}
        {profile.percentage === "80%" && (
          <Circle80 percentage={profile.percentage} />
        )}
        {profile.percentage === "0%" && (
          <Circle0 percentage={profile.percentage} />
        )}
      </div>
      <div className="flex flex-col pl-4 mt-3 mb-0 ">
        <div style={{ fontSize: "14px" }} className="ml-6 mb-1 font-bold">
          {profile.name}
        </div>

        {profile.status === "EN CURSO" && (
          <div
            style={{
              backgroundColor: "#F8E169",
              fontWeight: "600",
              fontSize: "10px",
            }}
            className="bg-[#F8E169] text-xs px-4 flex justify-center items-center pl-3 pr-3 rounded-xl"
          >
            {profile.status}
          </div>
        )}
        {profile.status === "ENTREGADO" && (
          <div
            style={{ fontWeight: "600", fontSize: "10px" }}
            className="bg-[#C7FFB1] text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
          >
            {profile.status}
          </div>
        )}
        {profile.status === "DESHABILITADO" && (
          <div
            style={{
              backgroundColor: "rgba(98, 98, 98, 0.2)",
              color: "#626262",
              fontWeight: "600",
              fontSize: "10px",
            }}
            className="text-xs px-4 flex justify-center w-max items-center pl-3 pr-3 rounded-xl"
          >
            {profile.status}
          </div>
        )}
      </div>

      <img
        src={profile.image}
        alt="foto"
        style={{ height: "40px", width: "40px" }}
        className="w-[40px] h-[40px] mt-5 rounded-full absolute right-0 flex items-center "
      />
    </div>
  );
};

export default Card;
