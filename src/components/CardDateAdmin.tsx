"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import arrowLeftIcon from "../assets/arrow-left-icon.svg";
import arrowRightIcon from "../assets/arrow-right-icon.svg";
import { getDataDeliverys } from "services/dataUsers";

interface Day {
  date: Date;
  disabled: boolean;
  selected: boolean;
}

interface DeliveryUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  createdAt: string;
}

// Define la interfaz para los datos de entrega completa
interface DataDeliverys {
  totalDeliveryUsersCount: number;
  activeDeliveryUsersCount: number;
  totalDeliveryUsers: DeliveryUser[];
  activeDeliveryUsers: DeliveryUser[];
}

interface Props {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setDataDeliverys: React.Dispatch<
    React.SetStateAction<DataDeliverys | undefined>
  >; // Ajusta el tipo según tus datos
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

const Calendar: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
  setSelectedDate,
  setDataDeliverys,
  selectedDate,
}) => {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    setSelectedDate(new Date()); // Establecer selectedDate al día actual
    setDays(getDaysInMonth(currentDate).map((day) => ({ ...day })));
  }, [currentDate]);

  useEffect(() => {
    // Función para cargar los datos de entrega al cargar el componente
    const fetchDataDeliverys = async () => {
      try {
        // Realizamos la solicitud a la función importada getDataDeliverys
        const data = await getDataDeliverys(
          selectedDate.toISOString().split("T")[0]
        );
        setDataDeliverys(data);
        console.log("Datos de los deliverys de la fecha seleccionada:", data);
      } catch (error) {
        console.error("Error al obtener los datos de los deliverys:", error);
      }
    };

    // Llamamos a la función para cargar los datos de entrega al cargar el componente
    fetchDataDeliverys();
  }, [selectedDate]); // Ejecuta el efecto cuando selectedDate cambie

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

  const handleDayClick = async (date: Date): Promise<void> => {
    const formattedDate = date.toISOString().split("T")[0];

    //console.log("FECHA FORMATEADA", formattedDate);

    if (formattedDate === "Invalid Date") {
      console.error("Error al formatear la fecha");
      return;
    }

    try {
      // Realizamos la solicitud a la función importada getDataDeliverys
      const data = await getDataDeliverys(formattedDate);
      setDataDeliverys(data);
      console.log("Datos de los deliverys de la fecha seleccionada:", data);
    } catch (error) {
      console.error("Error al obtener los datos de los deliverys:", error);
    }

    const updatedDays = days.map((day) => ({
      ...day,
      selected: day.date.getTime() === date.getTime(),
    }));
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

  const currentMonth = currentDate.toLocaleString("es-ES", { month: "long" });
  const isFirstDayOfMonth = currentDate.getDate() === 1;

  return (
    <>
      <div className="absolute w-[270px] h-[95px] top-[201px] left-[45px] rounded-[10px] border-[0.5px] border-solid border-[#3D1DF3] z-40">
        {/* Aquí puedes mostrar cualquier contenido adicional */}
      </div>
      <span className="absolute w-[41px] h-[15px] top-[210px] left-[55px] text-[14px] leading-[15px] text-[#3d1df3] font-bold z-40">
        {isFirstDayOfMonth
          ? currentDate.toLocaleString("es-ES", { month: "long" })
          : currentMonth}
      </span>

      <div className="absolute calendar flex flex-col items-center top-[201px] left-[45px] z-40">
        <div className="controls flex">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
              )
            }
            style={{ marginTop: "25px" }}
          >
            <Image src={arrowLeftIcon} alt="" />
          </button>
          <div className="days flex flex-wrap">{renderDays()}</div>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
              )
            }
            style={{ marginTop: "25px" }}
          >
            <Image src={arrowRightIcon} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;
