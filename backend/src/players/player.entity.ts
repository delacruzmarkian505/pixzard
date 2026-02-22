import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Potion } from '../potions/potion.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 1000 })
  coins: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 5 })
  dragonScales: number;

  @Column({ default: 5 })
  moonLeaves: number;

  @Column({ default: 5 })
  stormCores: number;

  @Column({ default: 5 })
  nightshade: number;

  @Column({ default: 5 })
  phoenixFeathers: number;

  @Column({ default: 5 })
  ghostMist: number;

  @OneToMany(() => Potion, (potion) => potion.player)
  potions: Potion[];
}
