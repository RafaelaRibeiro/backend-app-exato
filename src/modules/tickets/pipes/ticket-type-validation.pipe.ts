import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TicketTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = ['A', 'C', 'T', 'O', 'P'];

  transform(value: any): 'A' | 'C' | 'T' | 'O' | 'P' {
    if (!this.isTicketTypeValid(value)) {
      throw new BadRequestException(
        `"${value}" não é um tipo de chamado válido`,
      );
    }
    return value as 'A' | 'C' | 'T' | 'O' | 'P';
  }

  private isTicketTypeValid(type: any): boolean {
    const index = this.allowedTypes.indexOf(type);
    return index !== -1;
  }
}
