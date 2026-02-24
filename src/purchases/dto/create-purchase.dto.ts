export class CreatePurchaseDto {
	garmentName: string;
	price: number;
	// match entity field name
	purchase_date: string | Date;
	// service expects userId
	userId: number;
}
