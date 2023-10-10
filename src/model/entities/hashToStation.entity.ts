import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Meta from "./meta.entity";
import {Role} from "./role.entity";
import Station from "./station.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class HashToStation extends Meta {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column()
    expireDate: Date;

    @AutoMap(() => Station)
    @ManyToOne(() => Station, station => station.hashToStations, {onDelete: 'CASCADE'})
    @JoinColumn({name: "stationId"})
    station: Station;

    @AutoMap(() => Role)
    @ManyToOne(() => Role, role => role.hashToPingos, {onDelete: 'CASCADE'})
    @JoinColumn({name: "roleId"})
    role: Role;
}
