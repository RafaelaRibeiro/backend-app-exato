import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ClientsModule } from './modules/clients/clients.module';
import { UsersModule } from './modules/users/users.module';
import { DepartmentsModule } from './modules/clients/departments/departments.module';
import { TimesheetsModule } from './modules/timesheets/timesheets.module';
import { MorganMiddleware } from './shared/middlewares/logging.middleware';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/tickets/categories/categories.module';
import { PrioritiesModule } from './modules/tickets/priorities/priorities.module';
import { SituationsModule } from './modules/tickets/situations/situations.module';
import { FileUploadModule } from './shared/multer/storage.module';
import { ReportsModule } from './modules/reports/reports.module';
import { MailerModule } from './shared/providers/mail/mailer.module';
import { ContractsModule } from './modules/contracts/contracts.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    UsersModule,
    DepartmentsModule,
    TimesheetsModule,
    TicketsModule,
    AuthModule,
    CategoriesModule,
    PrioritiesModule,
    SituationsModule,
    FileUploadModule,
    ReportsModule,
    MailerModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
