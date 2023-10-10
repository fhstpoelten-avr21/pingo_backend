import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{


  @WebSocketServer() server: Server;

  handleConnection(client: Socket): void {

    client.on('send-message', (data) => {
      
      this.server.emit('receive-message', data);
    }
    );
    client.on("join-room", (room) => {
      client.join(room);
    }
    );

    client.on("leave-room", (room) => {
      client.leave(room);
    }
    );    
  }

  handleDisconnect(client: Socket): void {
    client.disconnect();

  }

  afterInit(server: Server): void {
    console.log('WebSocket server initialized');
  }
}
