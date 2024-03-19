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
    createdAt: string; // Se podría considerar usar un tipo Date si se parsea adecuadamente
  }[];
  activeDeliveryUsers: {
    id: number;
    name: string;
    surname: string;
    email: string;
    createdAt: string; // Se podría considerar usar un tipo Date si se parsea adecuadamente
  }[];
}

interface DataPackages {
  id: number;
  trackId: string;
  address: string;
  status: string;
  client: string;
  weight: number;
  date: string; // Se podría considerar usar un tipo Date si se parsea adecuadamente
  createdAt: string; // Se podría considerar usar un tipo Date si se parsea adecuadamente
  updatedAt: string; // Se podría considerar usar un tipo Date si se parsea adecuadamente
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
