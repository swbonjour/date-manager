import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';
import { ConfigEnv } from 'src/config/conf-env';
import { MIMEType } from 'util';

export enum StorageFolder {
  PROFILE = 'profile',
}

export class FileStorage {
  private basePath: string;

  constructor(private readonly configService: ConfigService<ConfigEnv>) {
    this.basePath = path.join(process.cwd(), 'storage');
  }

  private async ensureDirExists(path: string) {
    if (!fsSync.existsSync(path)) {
      await fs.mkdir(path, { recursive: true });
    }
  }

  private generateFilenameWithTimestamp(filename: string, mimetype: string) {
    return `${filename}_${new Date().valueOf()}.${new MIMEType(mimetype).subtype}`;
  }

  public async saveFile(
    file: Express.Multer.File,
    filename: string,
    folder: StorageFolder,
  ) {
    if (file.size > this.configService.get('file_size')) {
      console.error(
        `[STORAGE]: The file size is larger than limit (${(this.configService.get('file_size') / 1024 / 1024).toFixed(2)}MB`,
      );
      return;
    }

    const dirPath = path.join(this.basePath, folder);
    await this.ensureDirExists(dirPath);

    const filenameWithTimestamp = this.generateFilenameWithTimestamp(
      filename,
      file.mimetype,
    );

    const filePath = path.join(dirPath, filenameWithTimestamp);

    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (err: any) {
      console.error('[STORAGE]: error saving file', err);
    }
  }

  public async getFile(filename: string, folder: StorageFolder) {
    const dirPath = path.join(this.basePath, folder);

    const dir = await fs.readdir(dirPath, { withFileTypes: true });

    const file = dir.find(
      (item) => item.isFile() && item.name.includes(filename),
    );

    if (!file) {
      return;
    }

    const filePath = path.join(dirPath, file.name);

    return await fs.readFile(filePath);
  }
}
