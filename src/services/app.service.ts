import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AppService {
  getHello(req : Request, res : Response): Response {
    return res.status(200).json({ hello : "world..." });
  }
  getHi(): string{
    return 'Hi world...'
  }
}
