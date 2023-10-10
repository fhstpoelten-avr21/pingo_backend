import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import MediaDto from "src/dto/media.dto";
import Media from "src/model/entities/media.entity";

@Injectable()
export default class MediaMapper extends AutomapperProfile {

    constructor(@InjectMapper() readonly mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile{
        return (mapper) => {
            createMap(mapper, Media, MediaDto);
            createMap(mapper, MediaDto, Media);
        }
    }
}