import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RoleDto } from 'src/dto/role.dto';
import { StationDto } from 'src/dto/station.dto';
import UserDto from 'src/dto/user.dto';
import { UserToStationDto } from 'src/dto/userToStation.dto';
import { Role } from 'src/model/entities/role.entity';
import Station from 'src/model/entities/station.entity';
import { User } from 'src/model/entities/user.entity';
import UserToStation from 'src/model/entities/userToStation.entity';

@Injectable()
export class UserToStationMapperService extends AutomapperProfile {

    constructor(@InjectMapper() protected readonly mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, UserToStation, UserToStationDto,
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
                    (dest) => dest.station,
                    mapFrom(src => {
                        if (src.station) {
                            return this.mapper.map(src.station, Station, StationDto)
                        }
                    }),
                ),
            );
            createMap(mapper, UserToStationDto, UserToStation,
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
                    (dest) => dest.station,
                    mapFrom(src => {
                        if (src.station) {
                            return this.mapper.map(src.station, StationDto, Station)
                        }
                    }),
                ),
            );
        }
    }
}
