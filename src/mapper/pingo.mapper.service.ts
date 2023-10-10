import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { HashToPingoDto } from "src/dto/hashToPingo.dto";
import MediaDto from "src/dto/media.dto";
import PingoDto from "src/dto/pingo.dto";
import { StationDto } from "src/dto/station.dto";
import { UserToPingoDto } from "src/dto/userToPingo.dto";
import HashToPingo from "src/model/entities/hashToPingo.entity";
import Media from "src/model/entities/media.entity";
import Pingo from "src/model/entities/pingo.entity";
import Station from "src/model/entities/station.entity";
import UserToPingo from "src/model/entities/userToPingo.entity";

@Injectable()
export default class PingoMapper extends AutomapperProfile {

    constructor(
        @InjectMapper() readonly mapper: Mapper
    ) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, PingoDto, Pingo,
                forMember(
                    (dest) => dest.userToPingos,
                    mapFrom(src => {
                        if (src.userToPingos) {
                            return this.mapper.mapArray(src.userToPingos, UserToPingoDto, UserToPingo)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.hashToPingos,
                    mapFrom(src => {
                        if (src.hashToPingos) {
                            return this.mapper.mapArray(src.hashToPingos, HashToPingoDto, HashToPingo)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.stations,
                    mapFrom(src => {
                        if (src.stations) {
                            return this.mapper.mapArray(src.stations, StationDto, Station)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.media,
                    mapFrom(src => {
                        if (src.media) {
                            return this.mapper.mapArray(src.media, MediaDto, Media)
                        }
                    }),
                ),
            )
            createMap(mapper, Pingo, PingoDto,
                forMember(
                    (dest) => dest.userToPingos,
                    mapFrom(src => {
                        if (src.userToPingos) {
                            return this.mapper.mapArray(src.userToPingos, UserToPingo, UserToPingoDto);
                        }
                    })
                ),
                forMember(
                    (dest) => dest.hashToPingos,
                    mapFrom(src => {
                        if (src.hashToPingos) {
                            return this.mapper.mapArray(src.hashToPingos, HashToPingo, HashToPingoDto)
                        }
                    }),
                ),
                forMember(
                    (dest) => dest.stations,
                    mapFrom(src => {
                        if (src.stations) {
                            return this.mapper.mapArray(src.stations, Station, StationDto);
                        }
                    })
                ),
                forMember(
                    (dest) => dest.media,
                    mapFrom(src => {
                        if (src.media) {
                            return this.mapper.mapArray(src.media, Media, MediaDto)
                        }
                    }),
                ),
            );
        };
    }
}