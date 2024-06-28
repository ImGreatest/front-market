export interface IResUserDto {
	id: string;
	fullname: string;
	role: string;
	login: string;
	password: string;
	phone: string;
	createdAt?: Date;
	updatedAt?: Date;
	deleteAt?: Date;
}
