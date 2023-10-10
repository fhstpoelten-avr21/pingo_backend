import { Injectable } from "@nestjs/common";
import { RoleDto } from "../dto/role.dto";
import { Role } from "../model/entities/role.entity";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";

@Injectable()
export class RoleMapper extends AutomapperProfile {

    constructor(@InjectMapper() protected readonly mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Role, RoleDto);
            createMap(mapper, RoleDto, Role);
        }
    }
}