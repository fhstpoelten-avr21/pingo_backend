import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Meta from "./meta.entity";
import { User } from "./user.entity";
import { Role } from "./role.entity";
import Station from "./station.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class UserToStation extends Meta {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @AutoMap()
    @Column()
    done: boolean;

    @AutoMap(() => User)
    @ManyToOne(() => User, user => user.userToStations, {onDelete: 'CASCADE'})
    @JoinColumn({ name: "userId" })
    user: User;

    @AutoMap(() => Station)
    @ManyToOne(() => Station, station => station.userToStations, {onDelete: 'CASCADE'})
    @JoinColumn({ name: "stationId" })
    station: Station;

    @AutoMap(() => Role)
    @ManyToOne(() => Role, role => role.userToStations, {onDelete: 'CASCADE'})
    @JoinColumn({ name: "roleId" })
    role: Role;
}
