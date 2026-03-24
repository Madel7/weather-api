import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

 constructor() {
    this.redis = new Redis({
      host: 'https://infinite-rat-38605.upstash.io',          // مثال: infinite-rat-38605.upstash.io
      port: 6379, // مثال: 6379
      password: 'ApbNAAIgcDFY7N68tYO6utEevDt0zVKCdEka1Rrafwi8UDCv2Qj1sQ',   // الـ Token أو Readonly Token
      tls: {},                                // لازم لأن SSL مفعل
    });
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number) {
    return this.redis.set(key, value, 'EX', ttl);
  }
}
