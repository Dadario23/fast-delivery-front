"use client";
import React, { useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import Eye, { EyeBlocked } from "../assets/Eye/eye";
import CameraIcon from "assets/CameraIcon/camera-icon";
import BackIcon from "assets/BackIcon/back-icon";
import { useRouter } from "next/navigation";
import { registerUser } from "services/dataAuth";
import compressImage from "utils/compressImage";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const CreateAccountForm: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);

  const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(
    null
  );
  const inputElement = useRef<HTMLInputElement>(null);
  const [base64Imagen, setBase64Imagen] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const manejarSeleccionDeImagen = async (event: any) => {
    setError(null);

    if (event.target.files && event.target.files.length > 0) {
      const imagenSeleccionada2 = event.target.files[0];
      const tiposDeImagenPermitidos = ["image/jpeg", "image/jpg", "image/png"];

      if (!tiposDeImagenPermitidos.includes(imagenSeleccionada2.type)) {
        setError(
          "Formato de imagen no válido. Por favor, selecciona una imagen en formato JPG, JPEG, PNG"
        );
      } else {
        const limiteDeTamañoEnBytes = 1 * 1024 * 1024;
        if (imagenSeleccionada2.size > limiteDeTamañoEnBytes) {
          setError(
            "La imagen seleccionada supera el límite de peso permitido(máx 1mb)."
          );
        } else {
          try {
            const ci = await compressImage(imagenSeleccionada2, {});
            setImagenSeleccionada(ci);
            const reader = new FileReader();
            reader.onloadend = () => {
              setBase64Imagen(reader.result as string);
            };
            reader.readAsDataURL(ci);
          } catch (error) {
            setError("Ocurrió un error...");
            console.error(error);
          }

          //
        }
      }
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setImagenSeleccionada(null);
    setBase64Imagen("");
    setData((prevState) => {
      return { ...prevState, foto: "" };
    });
  };

  const handleClickOpenPhoto = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleClickClosePhoto = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(false);
    //setImagenSeleccionada(null);
  };

  const handleClickSaveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //uploadImage();
    setShowModal(false);
    setData((prevState) => {
      return { ...prevState, foto: base64Imagen };
    });
    //setImagenSeleccionada(null);
  };

  //
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    foto: "",
  });

  const handleVisibleClick = () => {
    setVisible(!visible);
  };
  const handleVisibleClick2 = () => {
    setVisible2(!visible2);
  };
  const handleChanges = (e: any) => {
    const { name, value } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingFields = [];

    if (!data.nombre) {
      missingFields.push("nombre");
    }
    if (!data.apellido) {
      missingFields.push("apellido");
    }
    if (!data.email) {
      missingFields.push("email");
    }
    if (!data.contraseña) {
      missingFields.push("contraseña");
    }
    if (!data.confirmarContraseña) {
      missingFields.push("confirmar contraseña");
    }
    if (!imagenSeleccionada) {
      missingFields.push("foto");
    }

    if (missingFields.length > 0) {
      const missingFieldsAlert = missingFields.join(", ");
      toast.error(
        `Falta completar los siguientes campos: ${missingFieldsAlert}`
      );
      return;
    }

    if (data.contraseña !== data.confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    // if (Object.values(data).some((value) => value === '')) {
    // 	alert('Todos los campos son obligatorios')
    // 	return
    // }
    // if (data.contraseña !== data.confirmarContraseña) {
    // 	alert('Las contraseñas no coinciden')
    // 	return
    // }
    try {
      await registerUser(data);
      toast.success("Usuario registrado exitosamente");
      router.push("/");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("El usuario no se pudo registrar, intente nuevamente");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center flex-wrap  rounded-xl mx-[30px] mt-[25px] mb-[60px] bg-[#C7FFB1] relative">
        <div className="w-full h-[50px] pl-0 flex items-center font-bold rounded-t-xl bg-[#C7FFB1] z-10 ">
          <div className="ml-3" onClick={() => router.back()}>
            <BackIcon />
          </div>
          <h2
            className="text-[#3d1df3] mr-10 flex-grow text-center"
            onClick={() => router.push("/login")}
          >
            Creá tu cuenta
          </h2>
        </div>
        <div className=" flex flex-col justify-center items-center bg-white rounded-xl  text-[85%] ">
          <div className="w-[95px] h-[95px] mb-4 mt-5  flex items-center justify-center border border-[#3d1df3] rounded-full">
            <div
              className="overflow-hidden flex items-center  justify-center"
              onClick={handleClickOpenPhoto}
              style={{
                borderRadius: `${imagenSeleccionada ? "50%" : ""}`,
                width: "95px",
                height: "95px",
                backgroundColor: `${imagenSeleccionada ? "#e6e6e6" : ""}`,
              }}
            >
              {!imagenSeleccionada ? (
                <CameraIcon />
              ) : (
                <img
                  src={URL.createObjectURL(imagenSeleccionada)}
                  alt="Vista previa de la imagen seleccionada"
                  style={{
                    maxHeight: "490px",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </div>

            {/*modal*/}
            {showModal && (
              <div
                className="flex absolute z-20 flex-col w-[89%] top-4 rounded-2xl "
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 0px 30px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="relative flex w-full items-center justify-center p-4">
                  {imagenSeleccionada != null ? (
                    <img
                      src={URL.createObjectURL(imagenSeleccionada)}
                      alt="Vista previa de la imagen seleccionada"
                      style={{
                        maxHeight: "490px",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <FaCircleUser
                      className="text-[#3d1df3]"
                      style={{ fontSize: "200px" }}
                    />
                  )}

                  <div className="flex w-[100%] h-[100%] flex-row absolute items-start justify-end p-2">
                    <div onClick={handleClickClosePhoto}>
                      <IoIosCloseCircle
                        style={{
                          color: "red",
                          fontSize: "30px",
                          opacity: "0.7",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-[100%] justify-between">
                  <div className="flex items-center justify-center w-[100%]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={manejarSeleccionDeImagen}
                      style={{ display: "none" }}
                      ref={inputElement}
                    />
                    <div
                      className="flex items-center  w-[80px] justify-center  p-1 text-indigo-700 rounded-2xl  transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500 m-3"
                      style={{ backgroundColor: "#00ea77" }}
                    >
                      {!imagenSeleccionada ? (
                        <button
                          onClick={() =>
                            inputElement.current && inputElement.current.click()
                          }
                        >
                          Cargar
                        </button>
                      ) : (
                        <button onClick={handleClickSaveImage}>Guardar</button>
                      )}
                    </div>
                  </div>
                  {imagenSeleccionada && (
                    <div className="flex w-[100%]">
                      <div
                        className="flex items-center w-[90px] justify-center  p-1 text-indigo-700 rounded-2xl  transition duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500 m-3"
                        style={{ backgroundColor: "#ffa1a1" }}
                        onClick={removeImage}
                      >
                        remover
                      </div>
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
            {/*modal*/}
          </div>
          <form className=" pl-4 text-[#3d1df3]" onSubmit={handleSubmit}>
            <input
              name="nombre"
              type="text"
              placeholder="Nombre"
              className={
                "w-[270px] mb-2 p-2 pl-4 border border-[#654ede] invalid:border-red-500 rounded-xl placeholder-[#3d1df3] placeholder-shown:border-gray-500  focus:outline-none "
              }
              value={data.nombre}
              pattern="([A-Za-z\s])+"
              onChange={handleChanges}
              // required
            />
            <input
              name="apellido"
              type="text"
              placeholder="Apellido"
              className={
                "w-[270px] mb-2 p-2 pl-4 border border-[#654ede] invalid:border-red-500 rounded-xl placeholder-[#3d1df3] focus:outline-none "
              }
              value={data.apellido}
              onChange={handleChanges}
              pattern="([A-Za-z\s])+"
              // required
            />
            <input
              name="email"
              type="email"
              placeholder="Email@contraseña"
              className={
                "w-[270px] mb-2 p-2 pl-4 border border-[#654ede] invalid:border-red-500 rounded-xl placeholder-[#3d1df3] focus:outline-none "
              }
              value={data.email}
              onChange={handleChanges}
              // required
            />
            <div className=" relative items-center">
              <input
                name="contraseña"
                placeholder="Contraseña"
                className={
                  "w-[270px] mb-2 p-2 pl-4 border border-[#654ede] invalid:border-red-500 rounded-xl placeholder-[#3d1df3] focus:outline-none "
                }
                value={data.contraseña}
                onChange={handleChanges}
                type={visible ? "text" : "password"}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                // required
              />
              <div
                className="absolute right-7 top-2"
                onClick={handleVisibleClick}
              >
                {visible ? <Eye /> : <EyeBlocked />}
              </div>
            </div>
            <div className="relative">
              <input
                name="confirmarContraseña"
                type={visible2 ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className={`w-[270px] mb-2 p-2 pl-4 border border-[#654ede]
              invalid:border-red-500 rounded-xl placeholder-[#3d1df3] focus:outline-none `}
                value={data.confirmarContraseña}
                onChange={handleChanges}
                // required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                // pattern={data.contraseña}
              />
              <div
                className="absolute right-7 top-2"
                onClick={handleVisibleClick2}
              >
                {visible2 ? <Eye /> : <EyeBlocked />}
              </div>
            </div>
            <button className="w-[270px] h-[30px] mt-4 mb-2 p-2 bg-[#00ea77] text-[#3d1df3] rounded-full pl-50 flex items-center justify-center hover:bg-white hover:border border-[#00ea77]">
              Crear
            </button>
            <h2 className="mb-2 flex items-center justify-center text-[#3d1df3] text-[12px]">
              ¿Ya tenés una cuenta?
            </h2>
            <button
              className="w-[270px] h-[30px] mb-2 p-2 bg-white border border-[#00ea77] text-[#3d1df3]  rounded-full pl-50 flex items-center justify-center hover:bg-[#00ea77]"
              onClick={() => router.push("/login")}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateAccountForm;
