import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class EnvironmentVariables {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsNumber()
  PORT: number = 3001;

  @IsString()
  MONGODB_URL = 'mongodb://127.0.0.1:27017/pwa';

  @IsString()
  JWT_SECRET = 'PWA-AHZJDFK1324';

  @IsString()
  WEBPUSH_PUBLIC_KEY = 'BEvDAHvropddQHYZOaia2vpuLBfgO18QgV1Hmbk_FkJDPXsW-RmMkzsfGXaGLLFsGQwuuhLMY-ZvFS5tyfDIpdQ';

  @IsString()
  WEBPUSH_PRIVATE_KEY = 'UIzfyFMJ1kmUnqjMfHCA8-A_4c32z_xJowDm5wq9qF0';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
}
