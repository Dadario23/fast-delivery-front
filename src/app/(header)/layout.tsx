"use client";
import axios from "axios";
import Navbar from "components/Navbar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set } from "state/user";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.id) dispatch(set(res.data));
      })
      .catch((err) => {
        console.error("Something was wrong...", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
