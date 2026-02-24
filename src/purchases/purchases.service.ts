import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const user = await this.usersService.findOne(
      createPurchaseDto.userId as number,
    );

    if (!user) throw new Error('User not found');

    const purchase = this.purchaseRepository.create({
      ...createPurchaseDto,
      user,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Purchase | null> {
    return await this.purchaseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase | null> {
    await this.purchaseRepository.update(id, updatePurchaseDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const purchase = await this.purchaseRepository.findOneBy({ id });

    if (!purchase) return null;

    await this.purchaseRepository.remove(purchase);
    return { id };
  }
}
