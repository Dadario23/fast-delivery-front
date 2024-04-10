"use client";
import React, { useState } from "react";
import CardDateAdmin from "./CardDateAdmin";
import CardAdmin from "./CardAdmin";
import CardGreenAdmin from "./CardGreenAdmin";
import CardDetailsCourier from "./CardDetailsCourier";

interface DataDeliverys {
  totalDeliveryUsersCount: number;
  activeDeliveryUsersCount: number;
  totalDeliveryUsers: {
    id: number;
    name: string;
    surname: string;
    email: string;
    createdAt: string; 
  }[];
  activeDeliveryUsers: {
    id: number;
    name: string;
    surname: string;
    email: string;
    createdAt: string;
  }[];
}

interface DataPackages {
  id: number;
  trackId: string;
  address: string;
  status: string;
  client: string;
  weight: number;
  date: string; 
  createdAt: string; 
  updatedAt: string; 
  userId: number | null;
}

const ManageOrder = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dataDeliverys, setDataDeliverys] = useState<DataDeliverys>();
  const [dataPackages, setDataPackages] = useState<DataPackages>();

  return (
    <>
      <CardGreenAdmin />
      <CardAdmin />
      <CardDateAdmin
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setDataDeliverys={setDataDeliverys}
        setDataPackages={setDataPackages}
      />
      <CardDetailsCourier
        selectedDate={selectedDate}
        dataDeliverys={dataDeliverys}
        dataPackages={dataPackages}
      />
    </>
  );
};

export default ManageOrder;
