import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotionsService } from './potions.service';
import { PotionsController } from './potions.controller';
import { Potion } from './potion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Potion])],
  controllers: [PotionsController],
  providers: [PotionsService],
})
export class PotionsModule {}
