import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {MetaDto} from './meta.dto';

export class ChatDto extends MetaDto {

    @AutoMap()
    id?: string;

    @AutoMap()
    @ApiProperty({description: 'Message'})
    message: string;

    @AutoMap()
    @ApiProperty({description: 'Sender'})
    sender: string;

    @AutoMap()
    @ApiProperty({description: 'Room'})
    room: string;

}