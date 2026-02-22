import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Potion } from './potion.entity';

@Injectable()
export class PotionsService {
  constructor(
    @InjectRepository(Potion)
    private potionRepository: Repository<Potion>,
  ) {}

  findAll(playerId?: number): Promise<Potion[]> {
    if (playerId) {
      return this.potionRepository.find({
        where: { player: { id: playerId } },
        order: { id: 'DESC' },
      });
    }
    return this.potionRepository.find({ order: { id: 'DESC' } });
  }

  findOne(id: number): Promise<Potion | null> {
    return this.potionRepository.findOneBy({ id });
  }

  async create(data: Partial<Potion>, playerId?: number): Promise<Potion> {
    const potion = this.potionRepository.create(data);
    if (playerId) {
      potion.player = { id: playerId } as any;
    }
    return this.potionRepository.save(potion);
  }
  async update(id: number, data: any): Promise<Potion | null> {
    await this.potionRepository.update(id, data);
    return this.potionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.potionRepository.delete(id);
  }
}
