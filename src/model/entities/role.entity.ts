import { Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import UserToPingo from "./userToPingo.entity";
import UserToStation from "./userToStation.entity";
import HashToPingo from "./hashToPingo.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Role {

    @AutoMap()
    @PrimaryGeneratedColumn("increment")
    id: number;

    @AutoMap()
    @Column()
    @Unique(["name"])
    name: string;

    @AutoMap()
    @Column()
    description: string;

    @AutoMap(() => [UserToPingo])
    @OneToMany(() => UserToPingo, userToPingo => userToPingo.role, { eager: false })
    userToPingos: UserToPingo[];

    @AutoMap(() => [UserToStation])
    @OneToMany(() => UserToStation, userToStation => userToStation.role, { eager: false })
    userToStations: UserToStation[];

    @AutoMap(() => [HashToPingo])
    @OneToMany(() => HashToPingo, hashToPingo => hashToPingo.role, { eager: false })
    hashToPingos: HashToPingo[];
}

