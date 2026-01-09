export interface ConfigEnv {
  port: number;

  db_host: string;
  db_port: number;
  db_user: string;
  db_pass: string;
  db_name: string;

  jwt_secret: string;

  is_dev: boolean;

  file_size: number;
}

export const config = () =>
  ({
    port: Number(process.env.PORT) || 3000,
    db_host: process.env.DB_HOST || 'localhost',
    db_port: Number(process.env.DB_PORT) || 5432,
    db_user: process.env.DB_USER || '',
    db_pass: process.env.DB_PASS || '',
    db_name: process.env.DB_NAME || '',
    jwt_secret: process.env.JWT_SECRET || '',
    is_dev: Boolean(Number(process.env.IS_DEV)) || true,
    file_size: Number(process.env.FILE_SIZE) || 0,
  }) satisfies ConfigEnv;
