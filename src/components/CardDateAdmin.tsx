"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import arrowLeftIcon from "../assets/arrow-left-icon.svg";
import arrowRightIcon from "../assets/arrow-right-icon.svg";

interface Day {
  date: Date;
  disabled: boolean;
  selected: boolean;
}

const daysOfWeek = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const initialDays = getDaysInMonth(currentDate);
    const today = new Date().getDate();
    initialDays.forEach((day) => {
      day.selected = day.date.getDate() === today;
    });
    setDays(initialDays);
  }, [currentDate]);

  const getDaysInMonth = (startDay: Date): Day[] => {
    const days: Day[] = [];
    const today = new Date();

    for (let i = -2; i < 3; i++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + i);
      days.push({ date, disabled: date > today, selected: false });
    }

    return days;
  };

  const handlePrevDay = (): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = (): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (date: Date): void => {
    const updatedDays = days.map((day) => {
      if (day.date.getTime() === date.getTime()) {
        return { ...day, selected: !day.selected };
      }
      return { ...day, selected: false };
    });
    setDays(updatedDays);
    setSelectedDate(date);
  };

  const renderDays = (): JSX.Element[] => {
    return days.map((day, index) => {
      const textColor = day.disabled ? "#98A0A6" : "#3D1DF3";
      const borderColor = day.disabled ? "#D1D5DB" : "#3D1DF3";
      const backgroundColor = day.disabled ? "#62626233" : "#00000024";
      const dayContainerStyle = {
        margin: "0 1px",
        marginTop: "35px",
        marginLeft: "4.5px",
      };
      const dayClassName = `w-[41px] h-[50px] border-[0.5px] top-[236px] border-solid rounded-[10px] text-[12px] ${textColor} border-${borderColor} ${
        day.selected ? "bg-[#C7FFB1]" : backgroundColor
      }`;

      const shortDayName = daysOfWeek[day.date.getDay()]
        .slice(0, 3)
        .toUpperCase();

      const dayNumber = day.date.getDate();
      const formattedDayNumber =
        dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();

      return (
        <div
          key={day.date.getTime()}
          className="day-container"
          style={dayContainerStyle}
        >
          <span
            className={`day flex items-center justify-center ${
              day.disabled ? "opacity-50" : ""
            }`}
            onClick={() => handleDayClick(day.date)}
            style={{ cursor: "pointer" }}
          >
            <span className={dayClassName}>
              <span className="flex flex-col items-center justify-center h-full">
                <span
                  className="font-normal text-[#3D1DF3]"
                  style={{ fontWeight: 400 }}
                >
                  {shortDayName}
                </span>
                <span
                  className="font-bold text-[#3D1DF3]"
                  style={{ fontWeight: 700 }}
                >
                  {formattedDayNumber}
                </span>
              </span>
            </span>
          </span>
        </div>
      );
    });
  };

  console.log(selectedDate);

  const currentMonth = currentDate.toLocaleString("es-ES", { month: "long" });

  // Verificar si el día actual es el primero del mes
  const isFirstDayOfMonth = currentDate.getDate() === 1;

  return (
    <>
      <div className="absolute w-[270px] h-[95px] top-[201px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40">
        h
      </div>
      <span className="absolute w-[41px] h-[15px] top-[210px] left-[55px] text-[14px] leading-[15px] text-[#3d1df3] font-bold z-40">
        {isFirstDayOfMonth
          ? currentDate.toLocaleString("es-ES", { month: "long" })
          : currentMonth}
      </span>

      <div className="absolute calendar flex flex-col items-center top-[201px] left-[45px] z-40">
        <div className="controls flex">
          <button onClick={handlePrevDay} style={{ marginTop: "25px" }}>
            {" "}
            {/* Mover hacia abajo */}
            <Image src={arrowLeftIcon} alt="" />
          </button>
          <div className="days flex flex-wrap">{renderDays()}</div>
          <button onClick={handleNextDay} style={{ marginTop: "25px" }}>
            {" "}
            {/* Mover hacia abajo */}
            <Image src={arrowRightIcon} alt="" />
          </button>
        </div>
        {/* {renderSelectedDate()} */}
      </div>
    </>
  );
};

export default Calendar;
