import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ChatMapperService } from "src/mapper/chat.mapper.service";
import { HashToPingoMapperService } from "src/mapper/hash-to-pingo.mapper.service";
import MediaMapper from "src/mapper/media.mapper.service";
import PingoMapper from "src/mapper/pingo.mapper.service";
import { RoleMapper } from "src/mapper/role.mapper.service";
import StationMapper from "src/mapper/station.mapper.service";
import { UserToPingoMapperService } from "src/mapper/user-to-pingo.mapper.service";
import { UserToStationMapperService } from "src/mapper/user-to-station.mapper.service";
import { UserMapper } from "src/mapper/user.mapper.service";

@Module({
    imports: [
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
    ],
    providers: [
        UserMapper, 
        RoleMapper, 
        MediaMapper,
        StationMapper,
        PingoMapper,
        UserToPingoMapperService,
        UserToStationMapperService,
        HashToPingoMapperService,
        ChatMapperService
    ],
})
export class AutomapperConfigModule {}