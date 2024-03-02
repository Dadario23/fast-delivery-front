// export interface PackageData{
//   direccion: string,
//   nombreDeQuienRecibe: string,
//   pesoDelPaquete: number,
//   fecha: Date | null
// }
export enum PackageStatus {
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled',
	PENDING = 'pending',
	ONGOING = 'ongoing',
}
export interface PackageData {
	trackId?: string;
	address: string;
	status: 'delivered' | 'cancelled' | 'pending' | 'ongoing';
	client: string;
	id: number;
	weight: number;
	date: Date;
	// user: {
	//   id: number;
	//   name: string;
	//   email: string;
	// };
	userId: number;
}
