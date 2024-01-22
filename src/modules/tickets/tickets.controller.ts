import {
  Body,
  Controller,
  Post,
  ParseIntPipe,
  Get,
  Param,
  Request,
  Patch,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketCreationService } from './services/ticketsCreation.service';
import {
  CreateTicketContentDto,
  CreateTicketDto,
  UpdateTicketDTO,
} from './tickets.dto';
import { TicketQueryService } from './services/ticketQuery.service';
import { TicketTypeValidationPipe } from './pipes/ticket-type-validation.pipe';
import { TicketsApprovalService } from './services/ticketApproval.service';
import { TicketReplyService } from './services/ticketReply.service';
import { TicketUpdateService } from './services/ticketUpdate.service';
import { TicketDeletionService } from './services/ticketDeletion.service';
import { AuthGuard } from '@nestjs/passport';
import { TicketsAttachmentService } from './services/ticketAttachment.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketCreationService: TicketCreationService,
    private readonly ticketQueryService: TicketQueryService,
    private readonly ticketsApprovalService: TicketsApprovalService,
    private readonly ticketReplyService: TicketReplyService,
    private readonly ticketUpdateService: TicketUpdateService,
    private readonly ticketDeletionService: TicketDeletionService,
    private readonly ticketAttachmentService: TicketsAttachmentService,
  ) {}

  @Post()
  async create(@Body() ticket: CreateTicketDto) {
    return this.ticketCreationService.create(ticket);
  }

  @Get('cards')
  async findTicketsByCards(@Request() req: any) {
    return this.ticketQueryService.findTicketsByCards(req.user.id);
  }

  @Get(':id')
  async findTicketById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketQueryService.findTicketById(id);
  }
  @Get('byUser/:ticketType')
  async listTicketsByType(
    @Param('ticketType', TicketTypeValidationPipe)
    ticketType: 'A' | 'C' | 'T' | 'O' | 'P',
    @Request() req: any,
  ) {
    console.log(req.user);

    return this.ticketQueryService.listUserTickets(req.user.id, ticketType);
  }

  @Get('byType/:ticketType')
  async listTickets(
    @Param('ticketType', TicketTypeValidationPipe)
    ticketType: 'A' | 'C' | 'T' | 'O' | 'P',
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.ticketQueryService.listTickets(userId, ticketType);
  }

  @Patch('approval')
  async approveTickets(@Body() ids: number[]) {
    return this.ticketsApprovalService.approveTickets(ids);
  }

  @Patch(':id/approval')
  async approveTicketsById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsApprovalService.approveTicketsById(id);
  }
  @Patch('disapprove')
  async disapproveTicketsSelect(@Body() ids: number[]) {
    return this.ticketsApprovalService.disapproveTicketsSelect(ids);
  }

  @Patch(':id/disapprove')
  async disapproveTicketsById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsApprovalService.disapproveTicketsById(id);
  }

  @Post(':id/reply')
  async ticketReply(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateTicketContentDto,
  ) {
    return this.ticketReplyService.ticketReply(data, id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTicketDTO,
  ) {
    return this.ticketUpdateService.update(data, id);
  }

  @Patch(':id/content')
  async updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() content: string,
  ) {
    return this.ticketUpdateService.updateContent(content, id);
  }

  @Delete()
  async deleteTickets(@Body() ids: number[]) {
    return this.ticketDeletionService.deleteTickets(ids);
  }

  @Delete(':id')
  async deleteTicketById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketDeletionService.deleteTicketById(id);
  }

  @Get(':ticket_content_id/files')
  async findFilesByContent(
    @Param('ticket_content_id', ParseIntPipe) ticket_content_id: number,
  ) {
    return this.ticketAttachmentService.findByContent(ticket_content_id);
  }
}
