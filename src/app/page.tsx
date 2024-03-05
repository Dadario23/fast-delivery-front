"use client";
import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set } from "state/user";
export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.id) {
          dispatch(set(res.data));
          console.log("usuario seteado en redux :)");
          setLogged(true);
        } else {
          setLogged(false);
        }
      })
      .catch((err) => {
        console.error("Something was wrong...", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>{loading ? <p>Cargando...</p> : <Login logged={logged} />}</main>
  );
}
