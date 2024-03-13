'use client'
import axios from 'axios'
import Navbar from 'components/Navbar'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllUsers } from 'state/allUsers'
import { set } from 'state/user'

export default function HeaderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const dispatch = useDispatch()
	useEffect(() => {
		axios
			.get('http://localhost:3001/api/users/me', { withCredentials: true })
			.then((res) => {
				if (res.data.id) {
					dispatch(set(res.data))
					if (res.data.isAdmin === true) {
						return axios
							.get('http://localhost:3001/api/users/', {
								withCredentials: true,
							})
							.then((res2) => {
								if (Array.isArray(res2.data)) {
									dispatch(setAllUsers(res2.data))
								}
							})
					}
				}
			})
			.catch((err) => {
				console.error('Something was wrong...', err)
			})
	}, [])

  
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
