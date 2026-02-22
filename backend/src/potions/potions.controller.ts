import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PotionsService } from './potions.service';
import { Potion } from './potion.entity';

@Controller('potions')
export class PotionsController {
  constructor(private readonly potionsService: PotionsService) {}

  @Get()
  findAll(@Query('playerId') playerId?: string): Promise<Potion[]> {
    return this.potionsService.findAll(playerId ? +playerId : undefined);
  }

  @Post()
  create(
    @Body() data: any,
    @Query('playerId') playerId?: string,
  ): Promise<Potion> {
    return this.potionsService.create(data, playerId ? +playerId : undefined);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any): Promise<Potion | null> {
    return this.potionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.potionsService.remove(+id);
  }
}
