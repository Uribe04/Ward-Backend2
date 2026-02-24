import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async create(createDto: CreateRolePermissionDto): Promise<RolePermission> {
    const newRelation = this.rolePermissionRepository.create(createDto);
    return await this.rolePermissionRepository.save(newRelation);
  }

  async findAll(): Promise<RolePermission[]> {
    return await this.rolePermissionRepository.find({
      relations: ['role', 'permission'],
    });
  }

  async findOne(id: number): Promise<RolePermission | null> {
    return await this.rolePermissionRepository.findOne({
      where: { id },
      relations: ['role', 'permission'],
    });
  }

  async update(
    id: number,
    updateDto: Partial<RolePermission>,
  ): Promise<RolePermission | null> {
    await this.rolePermissionRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const relation = await this.rolePermissionRepository.findOneBy({ id });

    if (!relation) return null;

    await this.rolePermissionRepository.remove(relation);
    return { id };
  }
}
