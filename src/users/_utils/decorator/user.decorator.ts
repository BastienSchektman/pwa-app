import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// eslint-disable-next-line import/prefer-default-export
export const User = createParamDecorator((
  data: string,
  ctx: ExecutionContext,
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
) => ctx.switchToHttp().getRequest().user);
