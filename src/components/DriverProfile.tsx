"use client";
import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { Switch } from "antd";
import DeliveriesAndHistory from "./DeliveriesAndHistory";

const DriverProfile: React.FC = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(true);

  const onClickSwitch = (checked: boolean, e: any) => {
    e.preventDefault();
    setSwitchValue(checked);
  };
  return (
    <>
      <div className="flex flex-col w-full mb-1 p-6 pt-2 pb-0 items-center bg-customBlue text-customBlue">
        {" "}
        <div
          className="flex flex-col w-full  items-center text-indigo-700 m-2 rounded-2xl"
          style={{ backgroundColor: "#c7ffb1" }}
        >
          <div className="flex flex-row w-full items-center p-4 pt-2 pb-2  justify-ceter">
            <IoArrowBackCircleOutline style={{ fontSize: "30px" }} />
            <div className="flex w-full justify-center px-7">
              <h1>
                <b>Perfil Repartidor</b>
              </h1>
            </div>
          </div>

          <div className="flex flex-row justify-between bg-white w-full rounded-2xl p-4">
            <div className="flex flex-row w-full items-center justify-start">
              <FaCircleUser style={{ fontSize: "60px" }} />
              <div className="flex flex-col ml-4">
                <h2>
                  <b>Name</b>
                </h2>
                <div
                  style={{
                    backgroundColor: `${switchValue ? "#c7ffb1" : "#bfbfbf"}`,
                  }}
                  className="flex justify-center items-center pl-2 pr-2 rounded-3xl"
                >
                  {/*title*/}
                  <h4 style={{ fontSize: "13px" }}>
                    <b>{switchValue ? "HABILITADO" : "DESHABILITADO"}</b>
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Switch
                defaultValue={switchValue}
                onChange={onClickSwitch}
                style={{
                  backgroundColor: `${switchValue ? "#00ea77" : "#bfbfbf"}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" p-6 pt-0">
        <DeliveriesAndHistory repartos={[]} historial={[]} />
      </div>
    </>
  );
};

export default DriverProfile;
