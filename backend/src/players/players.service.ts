import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: number): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { id },
      relations: ['potions'],
    });
  }

  async findByName(name: string): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { name },
      relations: ['potions'],
    });
  }

  create(name: string): Promise<Player> {
    const player = this.playerRepository.create({ name });
    return this.playerRepository.save(player);
  }

  async update(id: number, data: Partial<Player>): Promise<Player | null> {
    await this.playerRepository.update(id, data);
    return this.findOne(id);
  }
}
