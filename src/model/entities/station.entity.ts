import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pingo from "./pingo.entity";
import Media from "./media.entity";
import Meta from "./meta.entity";
import UserToStation from "./userToStation.entity";
import HashToStation from "./hashToStation.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class Station extends Meta {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    descr: string;

    @AutoMap()
    @Column()
    secret: string;

    @AutoMap()
    @Column()
    chat: boolean;

    @AutoMap()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
    })
    lat: number;

    @AutoMap()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
    })
    lng: number;

    @AutoMap()
    @Column()
    rank: number;

    @AutoMap()
    @Column()
    question: string;

    @AutoMap(() => Pingo)
    @ManyToOne(() => Pingo, pingo => pingo.stations, { eager: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "pingo_id", referencedColumnName: "id" })
    pingo: Pingo;

    @AutoMap(() => [Media])
    @OneToMany(() => Media, media => media.station, { eager: true, cascade: ['insert', 'update', 'remove'] })
    media: Media[];

    @AutoMap(() => [UserToStation])
    @OneToMany( () => UserToStation, userToStation => userToStation.station, {eager: true, cascade: ['insert', 'update', 'remove']})
    userToStations: UserToStation[];

    @AutoMap(() => [HashToStation])
    @OneToMany(() => HashToStation, hashToStation => hashToStation.station, {eager: true, cascade: ['insert', 'update', 'remove']})
    hashToStations: HashToStation[];
}