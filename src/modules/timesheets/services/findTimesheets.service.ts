import { Injectable, NotFoundException } from '@nestjs/common';
import { FindClientService } from 'src/modules/clients/services/findClient.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindTimesheetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findClientService: FindClientService,
  ) {}

  async findAll(selectedMonth: any, selectedYear: any, user_id: number) {
    const timesheets = await this.prisma.$queryRaw`
    select timesheet.id,
    formulas.date,
    timesheet.client_id, 
    timesheet.start_time, 
    timesheet.end_time, 
    timesheet.interval,
    clients.trade_name,
      CONCAT( LPAD(FLOOR(t/60),2,0), ':' , LPAD(FLOOR(t%60),2,0)) as timediff,
      if(contracts.type = 'F' and soma.s < contracts.limit,format(0,2,'da_DK'), format(ifnull(contracts.price *(t/60),0),2,'da_DK')) AS price ,
    

    case when start_time IS NULL then 2 ELSE 1 END
    from timesheet 
    inner join clients on timesheet.client_id = clients.id
    left join contracts ON clients.id = contracts.client_id
    inner join (SELECT id, 
    DATE_FORMAT(timesheet.date, '%d/%m/%Y') AS date, 
    (IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(timesheet.date, ' ', start_time), CONCAT(timesheet.date, ' ', end_time)),0) - timesheet.interval) as t
    

FROM timesheet 


WHERE month(timesheet.date) = ${selectedMonth} and year(timesheet.date)= ${selectedYear} and timesheet.user_id = ${user_id}) as formulas on timesheet.id = formulas.id

left join (SELECT  client_id, sum(IFNULL(TIMESTAMPDIFF(MINUTE, CONCAT(timesheet.date, ' ', start_time), CONCAT(timesheet.date, ' ', end_time)),0) - timesheet.interval)/60 as s FROM timesheet WHERE month(timesheet.date) = ${selectedMonth} and year(timesheet.date)= ${selectedYear} and timesheet.user_id = ${user_id} GROUP BY client_id) as soma on timesheet.client_id = soma.client_id

where timesheet.user_id = ${user_id}

order by 2, 4,3,6
    `;

    return timesheets;
  }

  async findAllByDate(
    startDate: Date,
    endDate: Date,
    client_id: string,
    user_id: number,
  ) {
    await this.findClientService.findOne(Number(client_id));
    if (!(startDate instanceof Date) || isNaN(startDate.valueOf())) {
      throw new Error('Invalid start date');
    }
    if (!(endDate instanceof Date) || isNaN(endDate.valueOf())) {
      throw new Error('Invalid end date');
    }
    try {
      const timesheets = await this.prisma.timesheet.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          client_id: Number(client_id),
          user_id,
        },
        select: {
          date: true,
          start_time: true,
          end_time: true,
          interval: true,
          client: {
            select: {
              trade_name: true,
              Contract: {
                select: {
                  price: true,
                },
              },
            },
          },
        },
      });

      return timesheets.map((timesheet) => {
        const [startHour, startMinute] = timesheet.start_time
          .split(':')
          .map(Number);
        const [endHour, endMinute] = timesheet.end_time.split(':').map(Number);

        const diffInMinutes =
          endHour * 60 +
          endMinute -
          (startHour * 60 + startMinute) -
          timesheet.interval;

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        const workedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

        return { ...timesheet, workedTime };
      });
    } catch (error) {
      console.error('Error fetching timesheets:', error);
      throw new Error('Failed to retrieve timesheets.');
    }
  }
  async findOne(id: number, user_id: number) {
    const timesheet = await this.prisma.timesheet.findUnique({
      where: { id, user_id },
      include: {
        client: {
          select: {
            trade_name: true,
          },
        },
      },
    });

    if (!timesheet)
      throw new NotFoundException('No Timesheet found with the given ID');

    return timesheet;
  }
}
