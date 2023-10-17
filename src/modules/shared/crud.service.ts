import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, FindOneOptions, Repository } from 'typeorm';
import { white } from 'chalk';

@Injectable()
export class CrudService<Entity> {
  constructor(
    @InjectRepository(Entity) private readonly repository: Repository<Entity>,
  ) {}

  async create(createDto: any): Promise<Entity[]> {
    const newEntity = this.repository.create(createDto);
    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Entity> {
    const entity = await this.repository.findOne({
      where: { id },
    } as any);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateDto: any): Promise<Entity> {
    const entity = await this.repository.findOne({
      where: { id },
    } as any);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    Object.assign(entity, updateDto);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<string> {
    const entity = await this.repository.findOne({
      where: { id } as any,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    await this.repository.remove(entity);
    return `Entity with id ${id} removed successfully`;
  }
}
