export class CreateOutfitDto {
	name: string;
	occasion?: string;
	// service expects a userId to find the user
	userId: number;
	// service expects garmentIds to fetch garments
	garmentIds: number[];
}
