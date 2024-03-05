import { createAction, createReducer } from '@reduxjs/toolkit'

interface UserState {
	id: number;
	email: string;
	isAdmin: boolean;
	name: string;
	surname: string;
	isDisabled: boolean;
	profileImage: string;
}

// Definir la acción
export const set = createAction<UserState>('SET')

export const setProfileImage = createAction<{
	profileImage: string;
}>('SET-PROFILE-IMAGE')

// Definir el estado inicial

const initialState: UserState = {
	id: -1,
	email: '',
	isAdmin: false,
	name: '',
	surname: '',
	isDisabled: false,
	profileImage: '',
}

// Crear el reducer
const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(set, (state, action) => {
		return { ...state, ...action.payload }
	})
	builder.addCase(setProfileImage, (state, action) => {
		return { ...state, ...action.payload }
	})
})

export default userReducer
