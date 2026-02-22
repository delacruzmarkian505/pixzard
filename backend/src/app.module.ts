import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PotionsModule } from './potions/potions.module';
import { PlayersModule } from './players/players.module';
import { Potion } from './potions/potion.entity';
import { Player } from './players/player.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // Prioritize the full connection URL if available
      url: process.env.MYSQL_URL || process.env.DATABASE_URL,
      // Fallback to individual fields if URL is not present
      ...(!process.env.MYSQL_URL && !process.env.DATABASE_URL
        ? {
            host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
            port: parseInt(
              process.env.DB_PORT || process.env.MYSQLPORT || '3306',
            ),
            username:
              process.env.DB_USERNAME || process.env.MYSQLUSER || 'root',
            password:
              process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
            database: process.env.DB_DATABASE || process.env.MYSQLDATABASE,
          }
        : {}),
      entities: [Potion, Player],
      synchronize: true, // Auto-create tables for simplicity
    }),
    PotionsModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
