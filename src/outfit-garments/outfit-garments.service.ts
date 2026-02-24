import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitGarment } from './entities/outfit-garment.entity';
import { CreateOutfitGarmentDto } from './dto/create-outfit-garment.dto';
import { UpdateOutfitGarmentDto } from './dto/update-outfit-garment.dto';

@Injectable()
export class OutfitGarmentsService {
  constructor(
    @InjectRepository(OutfitGarment)
    private readonly outfitGarmentRepository: Repository<OutfitGarment>,
  ) {}

  async create(createDto: CreateOutfitGarmentDto): Promise<OutfitGarment> {
    const newRelation = this.outfitGarmentRepository.create(createDto);
    return await this.outfitGarmentRepository.save(newRelation);
  }

  async findAll(): Promise<OutfitGarment[]> {
    return await this.outfitGarmentRepository.find({
      relations: ['outfit', 'garment'],
    });
  }

  async findOne(id: number): Promise<OutfitGarment | null> {
    return await this.outfitGarmentRepository.findOne({
      where: { id },
      relations: ['outfit', 'garment'],
    });
  }

  async update(
    id: number,
    updateDto: UpdateOutfitGarmentDto,
  ): Promise<OutfitGarment | null> {
    await this.outfitGarmentRepository.update(
      id,
      updateDto as Partial<OutfitGarment>,
    );
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const relation = await this.outfitGarmentRepository.findOneBy({ id });

    if (!relation) return null;

    await this.outfitGarmentRepository.remove(relation);
    return { id };
  }
}
