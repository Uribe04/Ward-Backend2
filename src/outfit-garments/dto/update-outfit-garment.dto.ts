import { PartialType } from '@nestjs/mapped-types';
import { CreateOutfitGarmentDto } from './create-outfit-garment.dto';

export class UpdateOutfitGarmentDto extends PartialType(CreateOutfitGarmentDto) {}
