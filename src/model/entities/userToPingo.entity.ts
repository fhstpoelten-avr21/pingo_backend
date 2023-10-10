import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Meta from "./meta.entity";
import { User } from "./user.entity";
import Pingo from "./pingo.entity";
import { Role } from "./role.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export default class UserToPingo extends Meta {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @AutoMap(() => User)
    @ManyToOne(() => User, user => user.userToPingos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @AutoMap(() => Pingo)
    @ManyToOne(() => Pingo, pingo => pingo.userToPingos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "pingoId", referencedColumnName: "id" })
    pingo: Pingo;

    @AutoMap(() => Role)
    @ManyToOne(() => Role, role => role.userToPingos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "roleId", referencedColumnName: "id" })
    role: Role;
}
