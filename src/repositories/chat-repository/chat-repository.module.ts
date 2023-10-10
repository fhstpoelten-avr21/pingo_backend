import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChatRepository from './chat.repository';
import Chat from '../../model/entities/chat.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatRepository],
    exports: [TypeOrmModule, ChatRepository]
})
export class ChatRepositoryModule {}
