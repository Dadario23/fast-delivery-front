"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Switch } from "antd";
import BackIcon from "assets/BackIcon/back-icon";
import DeliveriesAndHistory from "./DeliveriesAndHistory";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import "react-image-crop/dist/ReactCrop.css";
import { set, setProfileImage } from "state/user";

interface UserState {
  id?: number;
  email?: string;
  isAdmin?: boolean;
  name?: string;
  surname?: string;
  profileImage?: string;
}

const DriverProfile: React.FC = () => {
  const dispatch = useDispatch();
  const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(
    null
  );
  const inputElement = useRef<HTMLInputElement>(null);
  const [base64Imagen, setBase64Imagen] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const manejarSeleccionDeImagen = (event: any) => {
    setError(null);

    if (event.target.files && event.target.files.length > 0) {
      const imagenSeleccionada = event.target.files[0];

      const tiposDeImagenPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];

      if (!tiposDeImagenPermitidos.includes(imagenSeleccionada.type)) {
        setError(
          "Formato de imagen no válido. Por favor, selecciona una imagen en formato JPEG, PNG o GIF."
        );
      } else {
        const limiteDeTamañoEnBytes = 40 * 1024; // 1 MB
        if (imagenSeleccionada.size > limiteDeTamañoEnBytes) {
          setError(
            "La imagen seleccionada supera el límite de tamaño permitido(máx 40KB)."
          );
        } else {
          setImagenSeleccionada(imagenSeleccionada);

          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Imagen(reader.result as string);
          };
          reader.readAsDataURL(imagenSeleccionada);
        }
      }
    }
  };

  const uploadImage = () => {
    dispatch(setProfileImage({ profileImage: base64Imagen }));
    return axios
      .post(
        "http://localhost:3001/api/users/profile-image",
        { profileImage: base64Imagen },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeImage = () => {
    dispatch(setProfileImage({ profileImage: "" }));
    return axios
      .put(
        "http://localhost:3001/api/users/profile-image",
        { profileImage: "" },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const router = useRouter();
  const user = useSelector<RootState, UserState>((state) => state.user);

  const onClickSwitch = (checked: boolean, e: any) => {
    e.preventDefault();
    setSwitchValue(checked);
  };

  const handleClickOpenPhoto = (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClickClosePhoto = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleClickSaveImage = (e: any) => {
    e.preventDefault();
    uploadImage();
    handleClickClosePhoto(e);
    setImagenSeleccionada(null);
  };

  return (
    <div className="flex flex-col h-[92%] w-full mb-1 p-6 pt-2 pb-0 items-center bg-customBlue text-customBlue">
      {" "}
      {showModal && (
        <div
          className="flex  absolute w-[100%] h-[100%] z-10 "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
      )}
      <div
        className="flex relative flex-col w-full  items-center text-indigo-700 m-2 rounded-2xl"
        style={{ backgroundColor: "#c7ffb1" }}
      >
        <div
          className="flex flex-row w-full items-center p-4 pt-2 pb-2  justify-ceter"
          onClick={() => router.back()}
        >
          <BackIcon />
          <div className="flex w-full justify-center px-7">
            <h1>
              <b>Perfil del repartidor</b>
            </h1>
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white w-full rounded-2xl p-4">
          <div className="flex flex-row w-full items-center justify-start">
            {showModal && (
              <div
                className="flex flex-col absolute z-20 flex-col w-[89%] top-4 rounded-2xl"
                style={{ backgroundColor: "white" }}
              >
                <div className="relative flex w-full items-center justify-center ">
                  {user.profileImage != "" && !imagenSeleccionada ? (
                    <img
                      src={user.profileImage}
                      style={{ maxHeight: "490px" }}
                    />
                  ) : imagenSeleccionada != null ? (
                    <img
                      src={URL.createObjectURL(imagenSeleccionada)}
                      alt="Vista previa de la imagen seleccionada"
                      style={{ maxHeight: "490px", padding: "5px" }}
                    />
                  ) : (
                    <FaCircleUser style={{ fontSize: "300px" }} />
                  )}

                  <div className="flex w-[100%] h-[100%] flex-row absolute items-start justify-end p-2">
                    <div onClick={handleClickClosePhoto}>❌</div>
                  </div>
                </div>
                <div className="flex flex-row w-[100%]">
                  <div className="flex items-center justify-center w-[50%]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={manejarSeleccionDeImagen}
                      style={{ display: "none" }}
                      ref={inputElement}
                    />
                    {!imagenSeleccionada ? (
                      <button
                        onClick={
                          () =>
                            inputElement.current && inputElement.current.click() //esto hace la magia :v
                        }
                      >
                        Cargar
                      </button>
                    ) : (
                      <button onClick={handleClickSaveImage}>Guardar</button>
                    )}
                  </div>
                  {user.profileImage != "" && (
                    <div
                      className="flex items-center justify-center w-[50%]"
                      onClick={removeImage}
                    >
                      remover
                    </div>
                  )}
                </div>
                {error && (
                  <div className="p-4 text-xs">
                    <p style={{ color: "red" }}>{error}</p>
                  </div>
                )}
              </div>
            )}
            <div
              onClick={handleClickOpenPhoto}
              className="w-[60px] h-[60px] overflow-hidden flex items-center  justify-center"
              style={{ borderRadius: "50px" }}
            >
              {user.profileImage != "" ? (
                <img
                  src={user.profileImage}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                  }}
                />
              ) : (
                <FaCircleUser style={{ fontSize: "60px" }} />
              )}
            </div>
            <div className="flex flex-col ml-4" style={{ fontSize: "14px" }}>
              <h2>
                <b>Name</b>
              </h2>
              <div
                style={{
                  backgroundColor: `${switchValue ? "#c7ffb1" : "#bfbfbf"}`,
                }}
                className="flex justify-center items-center pl-2 pr-2 rounded-3xl mt-1"
              >
                {/*title*/}
                <h4 style={{ fontSize: "11px" }}>
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
      <div className=" w-full h-[70%] pt-0">
        <DeliveriesAndHistory repartos={[]} historial={[]} />
      </div>
    </div>
  );
};

export default DriverProfile;
