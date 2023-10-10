import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatDto } from 'src/dto/chat.dto';
import Chat from 'src/model/entities/chat.entity';
import ChatRepository from 'src/repositories/chat-repository/chat.repository';

@Injectable()
export class ChatService {

    constructor( private chatRepository: ChatRepository, @InjectMapper() private mapper: Mapper
    ) {     
    }

    async newChat(chatDto : ChatDto) : Promise<ChatDto> {
        const chat = this.mapper.map(chatDto, ChatDto, Chat);
        const newChat = await this.chatRepository.create(chat);
        return this.mapper.map(newChat, Chat, ChatDto);
    }

    async getChatByRoom(room: string) : Promise<ChatDto[]> {
        const chats = await this.chatRepository.findByRoom(room);

        if (chats) {

            return this.mapper.mapArray(chats, Chat, ChatDto);
        }

        throw new NotFoundException("Chat not found by this room");

}
}

