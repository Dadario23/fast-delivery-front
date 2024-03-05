import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

// Definir la acción
export const set = createAction<{
  id: number;
  email: string;
  isAdmin: boolean;
  name: string;
  surname: string;
  profileImage: string;
}>("SET");

export const setProfileImage = createAction<{
  profileImage: string;
}>("SET-PROFILE-IMAGE");

// Definir el estado inicial
interface UserState {
  id?: number;
  email?: string;
  isAdmin?: boolean;
  name?: string;
  surname?: string;
  profileImage?: string;
}

const initialState: UserState = {};

// Crear el reducer
const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(set, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setProfileImage, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default userReducer;
