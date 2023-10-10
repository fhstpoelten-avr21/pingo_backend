import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { HashToPingoDto } from 'src/dto/hashToPingo.dto';
import PingoDto from 'src/dto/pingo.dto';
import { RoleDto } from 'src/dto/role.dto';
import HashToPingo from 'src/model/entities/hashToPingo.entity';
import Pingo from 'src/model/entities/pingo.entity';
import { Role } from 'src/model/entities/role.entity';

@Injectable()
export class HashToPingoMapperService extends AutomapperProfile {

    constructor(@InjectMapper() protected readonly mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, HashToPingo, HashToPingoDto,
                forMember(
                    (dest) => dest.pingo,
                    mapFrom(src => {
                        if (src.pingo) {
                            return this.mapper.map(src.pingo, Pingo, PingoDto)
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
            );
            createMap(mapper, HashToPingoDto, HashToPingo,
                forMember(
                    (dest) => dest.pingo,
                    mapFrom(src => {
                        if (src.pingo) {
                            return this.mapper.map(src.pingo, PingoDto, Pingo)
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
            );
        }
    }
}
