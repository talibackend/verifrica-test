import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from '../utils/auth';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../modules/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let auth = req.headers['authorization'];
    if(!auth){
        throw new UnauthorizedException("Unauthorized request.");
    }
    auth = auth.replace('Bearer ', '');
    try{
        let validated = validate(auth);
        let user = await User.findOne({ where : { id : validated.id } });
        req['user'] = user;
        next();
    }catch(error){
        console.error(error)
        throw new UnauthorizedException("Unauthorized request.");
    }
  }
}
