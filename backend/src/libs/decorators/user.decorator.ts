import { createParamDecorator } from '@nestjs/common';
import { AuthTokenData } from '../dto/auth.dto';

export const AuthUser = createParamDecorator((data, req) => {
  return req.getArgs<[{ user: AuthTokenData }]>()[0].user;
});
