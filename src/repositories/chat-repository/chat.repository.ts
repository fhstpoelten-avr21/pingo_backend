import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Chat from '../../model/entities/chat.entity';



export default class ChatRepository {

    constructor(@InjectRepository(Chat) readonly repository: Repository<Chat>) { }

    async findAll(): Promise<Chat[]> {
        return await this.repository.find();
    }

    async create(chat: Chat): Promise<Chat> {
        return await this.repository.save(chat);
    }

    async findByRoom(room: string): Promise<Chat[]> {
        return await this.repository.find({ where: { room: room }, order: { createdAt: 'ASC' }});
    }

    async findBySender(sender: string): Promise<Chat[]> {
        return await this.repository.find({ where: { sender: sender } });
    }

    async findBySenderAndRoom(sender: string, room: string): Promise<Chat[]> {
        return await this.repository.find({ where: { sender: sender, room: room } });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }



}