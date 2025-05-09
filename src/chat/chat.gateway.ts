import {
  MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,
  OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import UsersService from '../users/users.service';
import UsersRepository from '../users/users.repository';
import GetUserDto from '../users/_utils/dto/response/get-user.dto';
import { Location } from '../locations/locations.schema';
import LocationsRepository from '../locations/locations.repository';

@WebSocketGateway({
  namespace: 'api/chat',
})

export default class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private usersRepository: UsersRepository,
    private locationsRepository: LocationsRepository,
    private readonly usersService: UsersService,
  ) {

  }

  @WebSocketServer()
    server;

  users: { socket: Socket, user: GetUserDto }[] = [];

  async findUser(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await this.usersService.getUser(id);
      return user;
    }
    return undefined;
  }

  async findLocation(id: string): Promise<Location> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const location = await this.locationsRepository.findOneById(id);
      return location;
    }
    return undefined;
  }

  async handleConnection(client: Socket): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let userConnected: any;
    let location;
    await this.findUser(client.handshake.query.userId as string).then((value) => {
      userConnected = value;
    });
    await this.findLocation(client.handshake.query.locationId as string).then((value) => {
      location = value;
    });

    if (userConnected === undefined || location === undefined) {
      client.disconnect();
    } else {
      // client.user = user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.users.push({ socket: client, user: userConnected });
      // this.clients.push({socket: client, user: user});
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() sendMessage: object,
      @ConnectedSocket() senderClient: Socket,
  ): Promise<void> {
    this.users.forEach((client) => {
      if (client.socket.handshake.query.locationId === senderClient.handshake.query.locationId) {
        client.socket.emit('message', { message: sendMessage, user: this.getUserByIdSocket(senderClient.id) });
      }
    });
  }

  getUserByIdSocket(id: string) : GetUserDto {
    return this.users.find((client) => client.socket.id === id).user;
  }

  handleDisconnect(client: Socket) {
    this.users = this.users.filter((value) => value.socket.id !== client.id);
  }
}
