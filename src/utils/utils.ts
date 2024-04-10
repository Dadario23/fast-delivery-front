export function percentageCalculator(value: number, total: number): number {
	if (total === 0) {
		throw new Error('El total no puede ser cero')
	}

	const percentage = (value / total) * 100
	return Math.round(percentage)
}
