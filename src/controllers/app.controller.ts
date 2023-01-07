import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Request, Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Req() req: Request, @Res() res: Response): Response {
    return this.appService.getHello(req, res);
  }

  @Get('hi')
  getHi(): string {
    return this.appService.getHi();
  }
}
