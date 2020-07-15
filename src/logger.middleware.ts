import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: any) {
    try {
        console.log(req.headers);
      const header = req.headers.authorization;
      console.log('yes calls token waiting here', header);
      if (header == undefined) throw 'forbidden';
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const decode = jwt.verify(token, "secret");
        console.log('check token here', decode);
        req.body.decodeToken = decode;
      }
      next();
    } catch (e) {
      console.log('check error now', e);
      res.status(403).send({
        responseCode: 403,
        responseMessage: 'Forbidden',
        result: 'Session Expired'
      });
    }
  }
}
