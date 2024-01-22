import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import * as path from 'path';

import * as crypto from 'crypto';

@Injectable()
export class TicketsAttachmentService {
  private s3Client: S3Client;
  constructor(private readonly prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  private generateKey() {
    return crypto.randomBytes(16).toString('hex');
  }

  async upload(
    fileContainer: { files: Express.MulterS3.File[] },
    ticket_content_id: number,
  ) {
    const files = fileContainer.files;

    try {
      const uploadPromises = files.map((file) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '');
        console.log(file);
        return this.prisma.ticketContentFile.create({
          data: {
            filename,
            size: file.size,
            path: file.location,
            key: file.key,
            originalname: file.originalname,
            ticket_content_id,
          },
        });
      });

      // Aguarde a resolução de todas as promessas
      const uploadFiles = await Promise.all(uploadPromises);

      return uploadFiles;
    } catch (error) {
      console.log('Error in TicketsAttachmentService: ', error);
      throw new Error('Failed to create file.');
    }
  }

  async findByContent(ticket_content_id: number) {
    const files = await this.prisma.ticketContentFile.findMany({
      where: { ticket_content_id },
    });

    return files;
  }

  async deleteFile(file_id: number, file_key: string) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: file_key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Error deleting file from S3');
    }

    try {
      await this.prisma.ticketContentFile.delete({
        where: { id: file_id },
      });
    } catch (error) {
      console.error('Error deleting file reference from database:', error);

      throw new Error(
        'Error deleting file reference from database, file was not deleted from S3',
      );
    }
  }
}
