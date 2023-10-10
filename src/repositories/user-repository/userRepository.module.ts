import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../model/entities/user.entity";
import {UserMapper} from "../../mapper/user.mapper.service";
import {UserRepository} from "./user.repository";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UserRepository],
    exports: [TypeOrmModule, UserRepository]
})
export class UserRepositoryModule{}