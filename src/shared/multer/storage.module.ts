// shared/modules/file-upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: StorageService,
    }),
  ],
  providers: [StorageService],
  exports: [MulterModule],
})
export class FileUploadModule {}
