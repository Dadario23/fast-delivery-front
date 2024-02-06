"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import PackageIcon from "assets/Package/package";
import TrashIcon from "assets/TrashIcon/trashIcon";

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
  const [showReps, setShowReps] = useState<boolean>(true);
  const [showRepsHistory, setShowRepsHistory] = useState<boolean>(true);
  const [repsAll, setRepsAll] = useState<Reparto[]>([]);
  const [reps, setReps] = useState<Reparto[]>([]);
  const [repsHistory, setRepsHistory] = useState<Reparto[]>([]);
  const [scrollPos, setScrollPos] = useState<{
    rt: boolean;
    rb: boolean;
    ht: boolean;
    hb: boolean;
  }>({
    rt: true,
    rb: false,
    ht: true,
    hb: false,
  });

  const divHistoryH = useRef<HTMLDivElement>(null);
  const divHistoryP = useRef<HTMLDivElement>(null);
  const divRepsP = useRef<HTMLDivElement>(null);
  const divRepsH = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      divHistoryH.current?.clientHeight == divHistoryH.current?.scrollHeight
    ) {
      if (showRepsHistory && repsHistory.length > 0)
        setScrollPos((prevState) => ({
          ...prevState,
          [`hb`]: true,
          [`ht`]: true,
        }));
    } else {
      handleScroll("h");
    }
  }, [
    divHistoryP.current?.clientHeight,
    showReps,
    showRepsHistory,
    repsHistory.length,
    reps.length,
  ]);

  useEffect(() => {
    if (divRepsH.current?.clientHeight == divRepsH.current?.scrollHeight) {
      if (showReps && reps.length > 0)
        setScrollPos((prevState) => ({
          ...prevState,
          [`rb`]: true,
          [`rt`]: true,
        }));
    } else {
      handleScroll("r");
    }
  }, [
    divRepsP.current?.clientHeight,
    showReps,
    showRepsHistory,
    repsHistory.length,
    reps.length,
  ]);

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

  const handleScroll = (c: string) => {
    const div = c == "h" ? divHistoryH.current : divRepsH.current;

    if (div && div.clientHeight != div.scrollHeight) {
      console.log("entre al handle");
      const isAtTop = div.scrollTop === 0;
      const isAtBottom =
        div.scrollHeight - div.scrollTop <= div.clientHeight + 1;
      if (isAtTop && !isAtBottom) {
        setScrollPos((prevState) => ({
          ...prevState,
          [`${c}b`]: false,
          [`${c}t`]: true,
        }));
      } else if (isAtBottom && !isAtTop) {
        setScrollPos((prevState) => ({
          ...prevState,
          [`${c}b`]: true,
          [`${c}t`]: false,
        }));
      } else if (!isAtBottom && !isAtTop) {
        setScrollPos((prevState) => ({
          ...prevState,
          [`${c}b`]: false,
          [`${c}t`]: false,
        }));
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-customBlue text-customBlue">
      {" "}
      {/*container */}
      <div
        className="flex bg-white text-indigo-700 w-full m-1 mb-0 p-4 flex-col rounded-2xl"
        style={{
          maxHeight: `${
            !showRepsHistory || repsHistory.length == 0
              ? "80%"
              : showRepsHistory && showReps && repsHistory.length >= 2
              ? "47%"
              : "64%"
          }`,
        }}
        ref={divRepsP}
      >
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
        <div
          className="overflow-y-auto"
          onScroll={() => handleScroll("r")}
          ref={divRepsH}
        >
          {/*implementar logica para mostrar el difuminado de acuerdo al desplazamiento */}
          {/*<div className='flex w-[78%] h-[20px] absolute bg-gradient-to-b from-white via-white to-transparent'></div>*/}
          {/* box examples */}

          {!scrollPos.rt && reps.length > 0 && showReps &&(
              <div className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-white via-rgba(255, 255, 255, 0.5) to-transparent"></div>
            )}

          {reps.length !== 0 &&
            showReps &&
            reps.map((rep) => (
              <div
                className="mt-3 mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
                key={rep.id}
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
        </div>
        {/* box examples end*/}
        <div className="flex h-[0px]">
          {" "}
          {/*sombreado inferior*/}
          {!scrollPos.rb && reps.length > 0 && showReps && (
            <div
              className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-transparent via-white to-white"
              style={{ transform: `translateY(-20px)` }}
            ></div>
          )}
        </div>
      </div>
      {/*===================================== */}
      <div
        className="flex bg-white text-indigo-700 w-full m-4 mb-1 p-4  flex-col rounded-2xl"
        style={{
          maxHeight: `${
            !showReps || reps.length == 0
              ? "81%"
              : showRepsHistory && showReps && reps.length >= 2
              ? "47%"
              : "64%"
          }`,
        }}
        ref={divHistoryP}
      >
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

        <div
          className="overflow-y-auto mt-1 rounded-[10px]"
          ref={divHistoryH}
          onScroll={() => handleScroll("h")}
          // style={{boxShadow:`${
          //   !scrollPos.ht&&!scrollPos.hb ? "inset 0 20px 20px -20px rgba(130, 130,130, 0.8) ,inset 0 -20px 20px -20px rgba(130,130,130, 0.8)"
          //   : !scrollPos.ht ? "inset 0 20px 20px -20px rgba(130,130,130, 0.8)"
          //   : !scrollPos.hb ? "inset 0 -20px 20px -20px rgba(130,130,130, 0.8)" : ""}`}}
        >
          {!scrollPos.ht && repsHistory.length > 0 && showRepsHistory &&(
              <div className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-white via-rgba(255, 255, 255, 0.5) to-transparent"></div>
            )}
          {/*sombreado superior*/}
          {/* box examples */}
          {repsHistory.length !== 0 &&
            showRepsHistory &&
            repsHistory.map((rep) => (
              <>
                {/*rep==repsHistory[0] && 
              !scrollPos.ht&&<div className='flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-white via-rgba(255, 255, 255, 0.5) to-transparent'></div>
          */}
                <div
                  className=" mr-0 flex p-[0.5px] pr-0 w-full h-[80px] rounded-[10px] border border-indigo-400 justify-between"
                  key={rep.id}
                  style={{
                    marginTop: `${rep == repsHistory[0] ? "" : "12px"}`,
                  }}
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
              </>
            ))}
        </div>
        {/* box examples end*/}
        <div className="flex h-[0px]">
          {" "}
          {/*sombreado inferior*/}
          {!scrollPos.hb && repsHistory.length > 0 && showRepsHistory && (
            <div
              className="flex w-[78%] h-[20px]  absolute bg-gradient-to-b from-transparent via-white to-white"
              style={{ transform: `translateY(-20px)` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DeliveriesAndHistory;
