import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import UserToPingo from "./userToPingo.entity";
import Meta from "./meta.entity";
import UserToStation from "./userToStation.entity";
import * as bcrypt from "bcrypt";
import { AutoMap } from "@automapper/classes";

@Entity()
export class User extends Meta{
    
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column()
    firstname: string;

    @AutoMap()
    @Column()
    lastname: string;

    @AutoMap()
    @Column()
    username: string;

    @AutoMap()
    @Column()
    password: string;

    @AutoMap()
    @Column()
    email: string;

    @Column()
    salt: string;

    @AutoMap(() => [UserToPingo])
    @OneToMany( () => UserToPingo, userToPingo => userToPingo.user, {eager: true})
    userToPingos: UserToPingo[];

    @AutoMap(() => [UserToStation])
    @OneToMany( () => UserToStation, userToStation => userToStation.user, {eager: true})
    userToStations: UserToStation[];

    async validatePassword(password: string){
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }

    async genSalt(): Promise<string>{
        return bcrypt.genSalt();
    }
}


