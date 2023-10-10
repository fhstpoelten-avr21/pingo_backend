import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import PingoDto from 'src/dto/pingo.dto';
import { RoleDto } from 'src/dto/role.dto';
import UserDto from 'src/dto/user.dto';
import { UserToPingoDto } from 'src/dto/userToPingo.dto';
import Pingo from 'src/model/entities/pingo.entity';
import { Role } from 'src/model/entities/role.entity';
import { User } from 'src/model/entities/user.entity';
import UserToPingo from 'src/model/entities/userToPingo.entity';

@Injectable()
export class UserToPingoMapperService extends AutomapperProfile {

    constructor(@InjectMapper() protected readonly mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, UserToPingo, UserToPingoDto,
                forMember(
                    (dest) => dest.user,
                    mapFrom(src => {
                        if (src.user) {
                            return this.mapper.map(src.user, User, UserDto)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.role,
                    mapFrom(src => {
                        if (src.role) {
                            return this.mapper.map(src.role, Role, RoleDto)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.pingo,
                    mapFrom(src => {
                        if (src.pingo) {
                            return this.mapper.map(src.pingo, Pingo, PingoDto)
                        }
                    }),
                ),
            );
            createMap(mapper, UserToPingoDto, UserToPingo,
                forMember(
                    (dest) => dest.user,
                    mapFrom(src => {
                        if (src.user) {
                            return this.mapper.map(src.user, UserDto, User)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.role,
                    mapFrom(src => {
                        if (src.role) {
                            return this.mapper.map(src.role, RoleDto, Role)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.pingo,
                    mapFrom(src => {
                        if (src.pingo) {
                            return this.mapper.map(src.pingo, PingoDto, Pingo)
                        }
                    }),
                ),
            );
        }
    }
}
