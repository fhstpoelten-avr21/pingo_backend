import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Meta from "./meta.entity";
import Pingo from "./pingo.entity";
import {Role} from "./role.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class HashToPingo extends Meta {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column()
    expireDate: Date;

    @AutoMap(() => Pingo)
    @ManyToOne(() => Pingo, pingo => pingo.hashToPingos, {onDelete: 'CASCADE'})
    @JoinColumn({name: "pingoId"})
    pingo: Pingo;

    @AutoMap(() => Role)
    @ManyToOne(() => Role, role => role.hashToPingos, {onDelete: 'CASCADE'})
    @JoinColumn({name: "roleId"})
    role: Role;
}
