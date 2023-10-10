import { Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";
import { User } from "../model/entities/user.entity";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";

@Injectable()
export class UserMapper extends AutomapperProfile {

    constructor(@InjectMapper() protected readonly mapper: Mapper) {
        super(mapper)
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, User, UserDto);
            createMap(mapper, UserDto, User);
        }
    }
}