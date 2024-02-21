import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer() server;

  @SubscribeMessage('newTicket')
  handleNewTicket(client: any, payload: any): void {
    this.server.emit('newTicket', payload);
  }

  @SubscribeMessage('newResponseAgent')
  handleNewResponseAgent(client: any, payload: any): void {
    this.server.emit('newResponseAgent', payload);
  }
  @SubscribeMessage('newResponseClient')
  handleNewResponseClient(client: any, payload: any): void {
    this.server.emit('newResponseClient', payload);
  }
}
