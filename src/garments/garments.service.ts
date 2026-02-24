import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Garment } from './entities/garment.entity';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly usersService: UsersService,
  ) {}

  // metodos
  async create(createGarmentDto: CreateGarmentDto): Promise<Garment> {
    const user = await this.usersService.findOne(
      createGarmentDto.userId as number,
    );

    if (!user) throw new Error('User not found');

    const garment = this.garmentRepository.create({
      ...createGarmentDto,
      user,
    });

    return await this.garmentRepository.save(garment);
  }

  async findAll(): Promise<Garment[]> {
    return await this.garmentRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Garment | null> {
    return await this.garmentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateGarmentDto: UpdateGarmentDto,
  ): Promise<Garment | null> {
    await this.garmentRepository.update(id, updateGarmentDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const garment = await this.garmentRepository.findOneBy({ id });

    if (!garment) return null;

    await this.garmentRepository.remove(garment);
    return { id };
  }
}
