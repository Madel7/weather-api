import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [HttpModule, RedisModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
