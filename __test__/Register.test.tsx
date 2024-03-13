import { render, screen, fireEvent } from "@testing-library/react";
import CreateAccountForm from "../src/components/CreateAccount";
import { registerUser } from "../src/services/dataAuth";
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
jest.mock("axios");

describe("registerUser", () => {
  test("should register a user", async () => {
    const userData = {
      nombre: "Jose",
      apellido: "Larralde",
      email: "jose.larralde@example.com",
      contraseña: "password123",
    };

    (axios.get as jest.Mock).mockResolvedValue(null);

    await expect(registerUser(userData)).resolves.toBe(true);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/api/users/register",
      {
        name: userData.nombre,
        surname: userData.apellido,
        email: userData.email,
        password: userData.contraseña,
        isAdmin: false,
      },
      {
        withCredentials: true,
      }
    );
  });
});
