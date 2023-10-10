import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Media from "./media.entity";
import Station from "./station.entity";
import Meta from "./meta.entity";
import UserToPingo from "./userToPingo.entity";
import HashToPingo from "./hashToPingo.entity";
import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";

@Entity()
export default class Pingo extends Meta{

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @AutoMap()
    @Column()
    isPublic: boolean;
    
    @AutoMap()
    @Column()
    isSnitzel: boolean;

    @AutoMap()
    @Column()
    chat: boolean;
    
    @AutoMap()
    @Column()
    name: string;
    
    @AutoMap()
    @Column()
    descr: string;

    @AutoMap(() => [Media])
    @OneToMany(() => Media, media => media.pingo, {eager: true, cascade: ['insert', 'update', 'remove']})
    @Type(() => Media)
    media: Media[];
    
    @AutoMap(() => [Station])
    @OneToMany(() => Station, station => station.pingo, {eager: true, cascade: ['insert', 'update', 'remove']})
    stations: Station[];
    
    @AutoMap(() => [UserToPingo])
    @OneToMany(() => UserToPingo, userToPingo => userToPingo.pingo, {eager: true, cascade: ['insert', 'update', 'remove']})
    userToPingos: UserToPingo[];
    
    @AutoMap(() => [HashToPingo])
    @OneToMany(() => HashToPingo, hashToPingo => hashToPingo.pingo, {eager: true, cascade: ['insert', 'update', 'remove']})
    hashToPingos: HashToPingo[];
}