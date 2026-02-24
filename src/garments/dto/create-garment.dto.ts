export class CreateGarmentDto {
	name: string;
	category: string;
	color?: string;
	brand?: string;
	user_count?: number;
	// service expects userId
	userId: number;
}
