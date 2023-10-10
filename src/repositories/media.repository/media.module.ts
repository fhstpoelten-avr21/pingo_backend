import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";


import Media from "src/model/entities/media.entity";
import { MediaRepository } from "./media.repository";
import MediaMapper from "src/mapper/media.mapper.service";


@Module({
    imports:[TypeOrmModule.forFeature([Media])],
    providers: [MediaMapper, MediaRepository],
    exports: [TypeOrmModule, MediaRepository]
})
export class MediaRepositoryModule{}