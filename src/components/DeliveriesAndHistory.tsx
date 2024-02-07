"use client";
import React, { useEffect, useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import PackageIcon from "assets/Package/package";
import TrashIcon from "assets/TrashIcon/trashIcon";
import { useRouter } from "next/navigation";
interface Reparto {
  id: number;
  code: string;
  mainAddress: string;
  subAddress: string;
  status: string;
}

const DeliveriesAndHistory: React.FC<{
  repartos: object[];
  historial: object[];
}> = ({ repartos, historial }) => {
  console.log(repartos, historial);
  const [showReps, setShowReps] = useState<boolean>(true);
  const [showRepsHistory, setShowRepsHistory] = useState<boolean>(true);
  const [repsAll, setRepsAll] = useState<Reparto[]>([]);
  const [reps, setReps] = useState<Reparto[]>([]);
  const [repsHistory, setRepsHistory] = useState<Reparto[]>([]);
  const router = useRouter();
  useEffect(() => {
    const repartosInfo: Reparto[] = [
      //fakedata
      {
        id: 1,
        code: "#023D",
        mainAddress: "Amenabar 2100",
        subAddress: "CABA",
        status: "pending",
      },
      {
        id: 2,
        code: "#023D",
        mainAddress: "Amenabar 2100",
        subAddress: "CABA",
        status: "ongoing",
      },
      {
        id: 3,
        code: "#023D",
        mainAddress: "Amenabar 2100",
        subAddress: "CABA",
        status: "delivered",
      },
      {
        id: 4,
        code: "#023D",
        mainAddress: "Amenabar 2100",
        subAddress: "CABA",
        status: "delivered",
      },
      {
        id: 5,
        code: "#023D",
        mainAddress: "Amenabar 2100",
        subAddress: "CABA",
        status: "cancelled",
      },
    ];
    setRepsAll(repartosInfo);
  }, []);

  useEffect(() => {
    setReps(
      repsAll.filter(
        (rep) => rep.status !== "delivered" && rep.status !== "cancelled"
      )
    );
    setRepsHistory(
      repsAll.filter(
        (rep) => rep.status === "delivered" || rep.status === "cancelled"
      )
    );
  }, [repsAll]);

  const onClickExpand = (e: any) => {
    e.preventDefault();
    setShowReps(!showReps);
  };

  const onClickExpandHistory = (e: any) => {
    e.preventDefault();
    setShowRepsHistory(!showRepsHistory);
  };

  const onClickButton1 = (id: number, status: string, e: any) => {
    e.preventDefault();
    const repsAux: Reparto[] = repsAll.map((r) =>
      r.id === id ? { ...r, status: status } : r
    );
    setRepsAll(repsAux);
  };

  return (
    <div className="flex flex-col w-full  items-center bg-customBlue text-customBlue">
      {" "}
      {/*container */}
      <div className="flex bg-white text-indigo-700 w-full m-1 mb-0 p-4 flex-col rounded-2xl">
        {" "}
        {/*subContainer */}
        <div className="flex items-center justify-between pl-1 pr-1">
          {/*header */}
          <h2 className="font-bold">Repartos Pendientes ({reps.length})</h2>
          {reps.length > 0 && (
            <div
              className="flex items-center justify-center p-1 bg-white text-indigo-700 active:bg-gray-500 hover:bg-gray-400 rounded-2xl transition duration-200 ease-in-out"
              onClick={onClickExpand}
            >
              {/*boton2*/}
              {showReps ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
          )}
        </div>
        {/* box examples */}
        {reps.length !== 0 &&
          showReps &&
          reps.map((rep) => (
            <div
              className="mt-3 mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
              key={rep.id}
              onClick={() => router.push("/ongoing-delivery")}
            >
              {" "}
              {/*box*/}
              <div className="flex items-center h-full w-15 justify-center">
                {/*boxLeft*/}
                <PackageIcon />

                <div className="w-px bg-indigo-400 h-14 ml-1 mr-1"></div>
                {/*separator*/}
              </div>
              <div className="flex w-6/12 flex-col justify-center h-full text-xs">
                {" "}
                {/*boxMid*/}
                <h3 className="mb-1">
                  <b>{rep.code}</b>
                </h3>
                <p>
                  {rep.mainAddress},
                  <br />
                  {rep.subAddress}
                </p>
              </div>
              <div className="flex items-end flex-col  w-35 justify-around between h-full ">
                {" "}
                {/*boxRight*/}
                <div
                  style={{
                    backgroundColor: `${
                      rep.status === "pending" ? "#aa9cfa" : "#f8e169"
                    }`,
                  }}
                  className={`flex justify-center w-max items-center pl-2 pr-3 rounded-l-xl rounded-tr`}
                >
                  {/*title*/}
                  <h4 style={{ fontSize: "11px" }}>
                    <b>{rep.status.toUpperCase()}</b>
                  </h4>
                </div>
                {rep.status === "ongoing" && (
                  <div
                    className="flex items-center justify-center p-2 bg-white text-indigo-700 rounded-2xl transition duration-200 ease-in-out hover:bg-gray-400 mr-3 active:bg-gray-500"
                    onClick={(e) => onClickButton1(rep.id, "cancelled", e)}
                  >
                    {" "}
                    {/*boton 2 customizado*/}
                    <TrashIcon />
                  </div>
                )}
                {rep.status === "pending" && (
                  <div
                    className="flex items-center justify-center  p-1 w-16 text-indigo-700 rounded-2xl mr-2 transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500"
                    style={{ backgroundColor: "#00ea77" }}
                    onClick={(e) => onClickButton1(rep.id, "ongoing", e)}
                  >
                    {" "}
                    {/*boton 1 customizado*/}
                    <h4 style={{ fontSize: "12px" }}>Iniciar</h4>
                  </div>
                )}
              </div>
            </div>
          ))}
        {/* box examples end*/}
      </div>
      {/*===================================== */}
      <div className="flex bg-white text-indigo-700 w-full m-4 mb-1 p-4 flex-col rounded-2xl">
        <div className="flex items-center justify-between pl-1 pr-1">
          <h2 className="font-bold">
            Historial de repartos ({repsHistory.length})
          </h2>
          {repsHistory.length > 0 && (
            <div
              className="flex items-center justify-center p-1 bg-white text-indigo-700 active:bg-gray-500 hover:bg-gray-400 rounded-2xl transition duration-200 ease-in-out"
              onClick={onClickExpandHistory}
            >
              {showRepsHistory ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
          )}
        </div>
        {showRepsHistory && repsHistory.length !== 0 && (
          <div className="pl-2" style={{ fontSize: "13px" }}>
            <p>
              {repsHistory.filter((rep) => rep.status === "delivered").length}{" "}
              pedidos entregados
            </p>
            <p>
              {repsHistory.filter((rep) => rep.status === "cancelled").length}{" "}
              pedidos cancelados
            </p>
          </div>
        )}
        {/* box examples */}
        {repsHistory.length !== 0 &&
          showRepsHistory &&
          repsHistory.map((rep) => (
            <div
              className="mt-3 mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
              key={rep.id}
            >
              <div className="flex items-center h-full w-15 justify-center">
                <PackageIcon />
                <div className="w-px bg-indigo-400 h-14 ml-1 mr-1"></div>
              </div>
              <div className="flex w-6/12 flex-col justify-center h-full text-xs">
                <h3 className="mb-1">
                  <b>{rep.code}</b>
                </h3>
                <p>
                  {rep.mainAddress},
                  <br />
                  {rep.subAddress}
                </p>
              </div>
              <div className="flex items-end flex-col  w-35 justify-between h-full">
                <div
                  style={{
                    fontSize: "11px",
                    backgroundColor: `${
                      rep.status === "delivered" ? "#c7ffb1" : "#FFA1A1"
                    }`,
                  }}
                  className={`flex justify-center w-max items-center pl-2 pr-3 mt-3 rounded-l-xl rounded-tr`}
                >
                  <h4>
                    <b>{rep.status.toUpperCase()}</b>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        {/* box examples end*/}
      </div>
    </div>
  );
};

export default DeliveriesAndHistory;
