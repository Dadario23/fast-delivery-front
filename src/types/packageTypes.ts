export enum PackageStatus {
	DELIVERED = 'ENTREGADO',
	CANCELLED = 'CANCELADO',
	PENDING = 'PENDIENTE',
	ONGOING = 'EN CURSO',
}
export interface PackageData {
	trackId?: string;
	address: string;
	status: 'ENTREGADO' | 'CANCELADO' | 'PENDIENTE' | 'EN CURSO';
	client: string;
	id: number;
	weight: number;
	date: Date;
	user: {
		id: number;
		name: string;
		email: string;
		isDisabled: boolean;
	};
	userId: number;
}

export interface Reparto {
	id: number;
	code: string;
	address: string;
	client: string;
	createdAt: string;
	date: string;
	trackId: string;
	updatedAt: string;
	userId: number;
	weight: number;
	status: string;
}
