import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import Meta from './meta.entity';

@Entity()
export default class Chat extends Meta
{
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @AutoMap()
    @Column()
    message: string;
    
    @AutoMap()
    @Column()
    sender: string;
    
    @AutoMap()
    @Column()
    room: string;
    }

