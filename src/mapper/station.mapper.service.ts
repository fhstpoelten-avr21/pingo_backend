import { Injectable } from "@nestjs/common";
import { StationDto } from "src/dto/station.dto";
import Pingo from "src/model/entities/pingo.entity";
import Station from "src/model/entities/station.entity";
import MediaMapper from "./media.mapper.service";
import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import UserToStation from "src/model/entities/userToStation.entity";
import { UserToStationDto } from "src/dto/userToStation.dto";
import MediaDto from "src/dto/media.dto";
import Media from "src/model/entities/media.entity";

@Injectable()
export default class StationMapper extends AutomapperProfile {

    constructor(
        @InjectMapper() readonly mapper: Mapper
    ) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, StationDto, Station,
                forMember(
                    (dest) => dest.userToStations,
                    mapFrom(src => {
                        if (src.userToStations) {
                            return this.mapper.mapArray(src.userToStations, UserToStationDto, UserToStation)
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
            createMap(mapper, Station, StationDto,
                forMember(
                    (dest) => dest.userToStations,
                    mapFrom(src => {
                        if (src.userToStations) {
                            return this.mapper.mapArray(src.userToStations, UserToStation, UserToStationDto)
                        }
                    }),
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