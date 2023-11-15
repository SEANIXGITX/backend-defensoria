import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser2 = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
