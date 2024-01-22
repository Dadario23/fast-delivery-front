import Navbar from 'components/Navbar'
import React from 'react'

export default function HeaderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
