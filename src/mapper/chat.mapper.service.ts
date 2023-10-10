import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ChatDto } from 'src/dto/chat.dto';
import Chat from 'src/model/entities/chat.entity';

@Injectable()
export class ChatMapperService extends AutomapperProfile {

    constructor(@InjectMapper() readonly mapper : Mapper) {
        super(mapper);
    }


    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Chat, ChatDto);
            createMap(mapper, ChatDto, Chat);
        }
        
    }
}
