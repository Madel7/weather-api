import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

@Get()
  async getWeather(
    @Query('city') city: string,
    @Query('full') full?: string,
  ) {
    let isFull = false;

    if (full) {
      if (full == 'true') {
        isFull = true;
      } else {
        isFull = false;
      }
    }
    return this.weatherService.getWeather(city, isFull);
  }
}
