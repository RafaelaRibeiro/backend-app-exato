import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNotificationDTO } from './notification.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(data: CreateNotificationDTO) {
    try {
      const notification = await this.prisma.notification.create({
        data,
      });
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new InternalServerErrorException(
        'Failed to create the notification.',
      );
    }
  }
}
