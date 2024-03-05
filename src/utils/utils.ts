export function percentageCalculator(value: number, total: number): number {
	if (total === 0) {
		throw new Error('El total no puede ser cero')
	}

	return (value / total) * 100
}
