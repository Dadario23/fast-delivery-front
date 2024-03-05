// export interface PackageData{
//   direccion: string,
//   nombreDeQuienRecibe: string,
//   pesoDelPaquete: number,
//   fecha: Date | null
// }
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
