"use client";
import React, { useState } from "react";

import CardDateAdmin from "./CardDateAdmin";
import CardAdmin from "./CardAdmin";
import CardGreenAdmin from "./CardGreenAdmin";
import CardDetailsCourier from "./CardDetailsCourier";

const ManageOrder = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <>
      <CardGreenAdmin />
      <CardAdmin />
      <CardDateAdmin
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CardDetailsCourier selectedDate={selectedDate} />
    </>
  );
};

export default ManageOrder;
