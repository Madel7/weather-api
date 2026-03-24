import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from 'src/redis/redis.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    private redisService: RedisService,
  ) {}

  async getWeather(city: string, full?:boolean) {
    const cacheKey = `weather:${city}`;

    //if exist in cache
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return full ? parsed.allData : parsed.weather;
    }

    //weather-api
    const apiKey = '884U52W4M8DV58CRDMPQFNYNQ';

    try {
      const response: any = await firstValueFrom(
        this.httpService.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`,
        ),
      );


        const allData = response.data;
    const now = response.data.days[0];

    const Celsius = (f: number) => ((f - 32) * 5 / 9).toFixed(1);

    const weather = {
      city:city,
      time: response.data.currentConditions.datetime,
      timezone: response.data.timezone,
      description: now.description,
      temperature: Celsius(now.temp),
      maxTemperature: Celsius(now.tempmax),
      minTemperature: Celsius(now.tempmin),
      humidity: now.humidity,
      rainProbability: now.precipprob,
    };

    //store in cache for 2 minutes instead of 12 hours, updated.
    const cacheObj = { weather, allData };
    await this.redisService.set(cacheKey, JSON.stringify(cacheObj), 120);

    return full ? allData : weather;

  } catch (error) {
  
  const errorMessage = error.response?.data || error.message;
  throw new HttpException(errorMessage, error.response?.status || 500);
  }
}
}