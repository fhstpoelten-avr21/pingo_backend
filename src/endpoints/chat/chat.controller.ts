import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatDto } from 'src/dto/chat.dto';
import { ChatService } from 'src/services/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) { }

    @Get(":room")
    public getChatByRoom(
       
    @Param('room') room: string): Promise<ChatDto[]> {
            
        return this.chatService.getChatByRoom(room);

    }
    @Post()
    public newChat(@Body() chatDto : ChatDto )  {

        return this.chatService.newChat(chatDto);
    }
}
