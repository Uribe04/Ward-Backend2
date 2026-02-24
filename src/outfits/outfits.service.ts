import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Outfit } from './entities/outfit.entity';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { UsersService } from '../users/users.service';
import { Garment } from '../garments/entities/garment.entity';
import { OutfitGarment } from '../outfit-garments/entities/outfit-garment.entity';

@Injectable()
export class OutfitsService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepository: Repository<Outfit>,
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    @InjectRepository(OutfitGarment)
    private readonly outfitGarmentRepository: Repository<OutfitGarment>,
    private readonly usersService: UsersService,
  ) {}

  async create(createOutfitDto: CreateOutfitDto): Promise<Outfit | null> {
    const user = await this.usersService.findOne(
      createOutfitDto.userId as number,
    );

    if (!user) throw new Error('User not found');

    const garments = await this.garmentRepository.find({
      where: { id: In(createOutfitDto.garmentIds as number[]) },
    });

    const outfit = this.outfitRepository.create({
      name: createOutfitDto.name as string,
      occasion: createOutfitDto.occasion as string | undefined,
      user,
    });

    const savedOutfit = await this.outfitRepository.save(outfit);

    const relations = garments.map((g) =>
      this.outfitGarmentRepository.create({ outfit: savedOutfit, garment: g }),
    );

    if (relations.length > 0) {
      await this.outfitGarmentRepository.save(relations);
    }

    return await this.findOne(savedOutfit.id);
  }

  async findAll(): Promise<Outfit[]> {
    return await this.outfitRepository.find({
      relations: ['user', 'outfit_garments'],
    });
  }

  async findOne(id: number): Promise<Outfit | null> {
    return await this.outfitRepository.findOne({
      where: { id },
      relations: ['outfit_garments'],
    });
  }

  async update(
    id: number,
    updateOutfitDto: UpdateOutfitDto,
  ): Promise<Outfit | null> {
    await this.outfitRepository.update(id, updateOutfitDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const outfit = await this.outfitRepository.findOneBy({ id });

    if (!outfit) return null;

    await this.outfitRepository.remove(outfit);
    return { id };
  }
}
