"use client";
import axios from "axios";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllUsers } from "state/allUsers";
import { set } from "state/user";
import { usePathname, useRouter } from "next/navigation";
import authenticateRoute from "utils/routeAuthenticator";

// Configura Axios para incluir las cookies con todas las solicitudes
axios.defaults.withCredentials = true;

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const dispatch = useDispatch();
  const router = useRouter();
  const url = usePathname();
  const route = authenticateRoute(url);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!url.includes("/register")) {
      axios
        .get(`${API_URL}/api/users/me`)
        .then((res) => {
          if (res.data.id) {
            dispatch(set(res.data));
            if (res.data.isAdmin === true) {
              axios.get(`${API_URL}/api/users/`).then((res2) => {
                if (Array.isArray(res2.data)) {
                  dispatch(setAllUsers(res2.data));
                }
                if (route.isDriverRoute) {
                  router.push("/");
                } else setLoading(false);
              });
            } else if (route.isAdminRoute) {
              router.push("/");
            } else setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Something was wrong...", err);
        });
    } else setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-row rounded-2xl p-4 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
