import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TicketsAttachmentService } from './services/ticketAttachment.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly ticketAttachmentService: TicketsAttachmentService,
  ) {}

  @Post(':ticket_content_id/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }], multerConfig))
  async uploadFile(
    @UploadedFiles() fileContainer: { files: Express.MulterS3.File[] },

    @Param('ticket_content_id', ParseIntPipe) ticket_content_id: number,
  ) {
    const uploaded = this.ticketAttachmentService.upload(
      fileContainer,
      ticket_content_id,
    );

    return {
      success: true,
      data: uploaded,
      message: 'Files uploaded successfully.',
    };
  }

  @Delete()
  async deleteFiles(
    @Body('file_id', ParseIntPipe) file_id: number,
    @Body('file_key') file_key: string,
  ) {
    const fileIdNum = Number(file_id);
    console.log(fileIdNum);
    await this.ticketAttachmentService.deleteFile(fileIdNum, file_key);
    return { message: 'File successfully deleted' };
  }
}
