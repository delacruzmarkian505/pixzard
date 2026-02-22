import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.playersService.create(name);
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const player = await this.playersService.findByName(name);
    if (!player) {
      throw new NotFoundException(`Wizard ${name} not found`);
    }
    return player;
  }

  @Patch(':id/stats')
  update(@Param('id') id: string, @Body() body: any) {
    return this.playersService.update(+id, body);
  }
}
