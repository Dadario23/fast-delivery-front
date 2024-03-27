import { createAction, createReducer } from '@reduxjs/toolkit'

import { UserState } from 'types/userTypes'

export const set = createAction<UserState>('SET')

export const setProfileImage = createAction<{
	profileImage: string;
}>('SET-PROFILE-IMAGE')

export const clear = createAction<null>('CLEAR')

const initialState: UserState = {
	id: -1,
	email: '',
	isAdmin: false,
	name: '',
	surname: '',
	isDisabled: false,
	profileImage: '',
}

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(set, (state, action) => {
		return { ...state, ...action.payload }
	})
	builder.addCase(setProfileImage, (state, action) => {
		return { ...state, ...action.payload }
	})
	builder.addCase(clear, () => {
		return { ...initialState }
	})
})

export default userReducer
