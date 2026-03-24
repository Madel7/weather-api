import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,            
      port: 6379,  
      password: process.env.REDIS_PASSWORD,    
      tls: {},                                  
    });
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number) {
    return this.redis.set(key, value, 'EX', ttl);
  }
}
