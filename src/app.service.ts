import { Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
   
    return 'hello world';
  }
}
