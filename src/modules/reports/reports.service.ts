import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ReportTimesheetByClientsDTO } from './reports.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async findTimesheetsByClient(data: ReportTimesheetByClientsDTO) {
    try {
      const timesheets = await this.prisma.$queryRaw`
      select  u.name ,c.trade_name, t.date ,  t.start_time , t.end_time, CONCAT(LPAD(FLOOR( (IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(t.date, ' ', start_time), CONCAT(t.date, ' ', end_time)),0))/60),2,0), ':', LPAD(FLOOR( (IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(t.date, ' ', start_time), CONCAT(t.date, ' ', end_time)),0))%60),2,0))  as tempo, (IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(t.date, ' ', start_time), CONCAT(t.date, ' ', end_time)),0)) /60  * contracts.price as price from timesheet t 
      inner join clients c on t.client_id = c.id 
      inner join contracts on contracts.client_id = t.client_id 
      left join users u on t.user_id = u.id
      WHERE t.date >= ${data.startDate} and t.date < DATE_ADD(${
        data.endDate
      }, INTERVAL 1 DAY)  and contracts.type = 'H' and
    FIND_IN_SET(t.client_id, ${data.clientsIds.join()})

union all

select 'Total', '' , '', '' , '' , '', sum(IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(t.date, ' ', start_time), CONCAT(t.date, ' ', end_time)),0) /60  * contracts.price) as price from timesheet t 
inner join clients c on t.client_id = c.id 
inner join contracts on contracts.client_id = t.client_id 
WHERE t.date >= ${data.startDate} and t.date < DATE_ADD(${
        data.endDate
      }, INTERVAL 1 DAY)  and contracts.type = 'H' and
    FIND_IN_SET(t.client_id, ${data.clientsIds.join()}) and contracts.type = 'H'
      `;

      return timesheets;
    } catch (error) {}
  }
}
