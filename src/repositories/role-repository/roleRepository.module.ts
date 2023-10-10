import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../../model/entities/role.entity";
import {RoleRepository} from "./role.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Role])],
    providers: [RoleRepository],
    exports: [TypeOrmModule, RoleRepository]
})
export class RoleRepositoryModule{}