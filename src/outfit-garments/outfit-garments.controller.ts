import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OutfitGarmentsService } from './outfit-garments.service';
import { CreateOutfitGarmentDto } from './dto/create-outfit-garment.dto';
import { UpdateOutfitGarmentDto } from './dto/update-outfit-garment.dto';

@Controller('outfit-garments')
export class OutfitGarmentsController {
  constructor(private readonly outfitGarmentsService: OutfitGarmentsService) {}

  @Post()
  create(@Body() createOutfitGarmentDto: CreateOutfitGarmentDto) {
    return this.outfitGarmentsService.create(createOutfitGarmentDto);
  }

  @Get()
  findAll() {
    return this.outfitGarmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outfitGarmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOutfitGarmentDto: UpdateOutfitGarmentDto,
  ) {
    return this.outfitGarmentsService.update(+id, updateOutfitGarmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outfitGarmentsService.remove(+id);
  }
}
