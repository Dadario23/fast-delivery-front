'use client'
import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { set } from 'state/user'
import { setAllUsers } from 'state/allUsers'
export default function Home() {
	const [logged, setLogged] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const dispatch = useDispatch()
	useEffect(() => {
		axios
			.get('http://localhost:3001/api/users/me', { withCredentials: true })
			.then((res) => {
				if (res.data.id) {
					dispatch(set(res.data))
					setLogged(true)
					if (res.data.isAdmin === true) {
						axios
							.get('http://localhost:3001/api/users/', {
								withCredentials: true,
							})
							.then((res2) => {
								if (Array.isArray(res2.data)) {
									dispatch(setAllUsers(res2.data))
								}
							})
					}
				} else {
					setLogged(false)
				}
			})
			.catch((err) => {
				console.error('Something was wrong...', err)
				setLoading(false)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

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
		)

	return (
		<main>
			<Login logged={logged} />
		</main>
	)
}
