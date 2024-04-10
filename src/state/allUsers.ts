import { createAction, createReducer } from '@reduxjs/toolkit'

interface UserState {
	id: number;
	email: string;
	isAdmin: boolean;
	name: string;
	surname: string;
	profileImage: string;
	isDisabled: boolean;
}

export const setAllUsers = createAction<UserState[]>('SET-ALL-USERS')

export const setProfileImageFromAdmin = createAction<{
	id: number;
	profileImage: string;
}>('SET-PROFILE-IMAGE-ADMIN')

export const updateDriverState = createAction<{
	id: number;
	isDisabled: boolean;
}>('UPDATE-DRIVER-STATE')

const initialState: UserState[] = []

const allUsersReducer = createReducer(initialState, (builder) => {
	builder.addCase(setAllUsers, (state, action) => {
		return [...state, ...action.payload]
	})
	builder.addCase(setProfileImageFromAdmin, (state, action) => {
		return state.map((user) =>
			user.id === action.payload.id
				? { ...user, profileImage: action.payload.profileImage }
				: user
		)
	})
	builder.addCase(updateDriverState, (state, action) => {
		return state.map((user) =>
			user.id === action.payload.id
				? { ...user, isDisabled: action.payload.isDisabled }
				: user
		)
	})
})

export default allUsersReducer
