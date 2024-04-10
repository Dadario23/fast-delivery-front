const authenticateRoute = (url: string) => {
	const driverRoutes = [
		'/home',
		'/register',
		'/affidavit',
		'/packages-selection',
	]
	const adminRoutes = [
		'/manage-orders',
		'/packages-office',
		'/delivery-drivers',
		'/driver-profile',
		'/add-package',
	]
	const isDriverRoute = driverRoutes.some((sbs) => url.includes(sbs))
	const isAdminRoute = adminRoutes.some((sbs) => url.includes(sbs))
	return { isAdminRoute, isDriverRoute }
}

export default authenticateRoute
