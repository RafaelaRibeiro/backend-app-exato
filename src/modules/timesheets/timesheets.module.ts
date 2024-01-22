import { Module } from '@nestjs/common';

import { TimesheetsController } from './timesheets.controller';
import { FindTimesheetsService } from './services/findTimesheets.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindClientService } from '../clients/services/findClient.service';
import { CreateTimesheetService } from './services/createTimesheets.service';
import { UpdateTimesheetService } from './services/updateTimesheet.service';
import { RemoveTimesheetService } from './services/removeTimesheet.service';

@Module({
  controllers: [TimesheetsController],
  providers: [
    FindTimesheetsService,
    FindClientService,
    CreateTimesheetService,
    UpdateTimesheetService,
    RemoveTimesheetService,
  ],
  imports: [PrismaModule],
})
export class TimesheetsModule {}
