import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi')
  getHi(): string {
    return this.appService.getHi();
  }
}
