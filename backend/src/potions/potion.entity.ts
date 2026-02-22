import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from '../players/player.entity';

@Entity('potions')
export class Potion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  effect: string;

  @Column({ default: 'from-orange-400 to-pink-500' })
  color: string;

  @Column({ default: 'Common' })
  rarity: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Player, (player) => player.potions)
  player: Player;
}
