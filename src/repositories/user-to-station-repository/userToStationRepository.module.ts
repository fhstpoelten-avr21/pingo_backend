import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserToPingo from "src/model/entities/userToPingo.entity";
import UserToStationRepository from "./userToStationRepository";
import UserToStation from "../../model/entities/userToStation.entity";
import HashToStationRepository from "../hash-to-station-repository/hashToStationRepository";
import {HashToStationRepositoryModule} from "../hash-to-station-repository/hashToStationRepository.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserToStation]), HashToStationRepositoryModule],
    providers: [UserToStationRepository, HashToStationRepository],
    exports: [TypeOrmModule, UserToStationRepository]
})
export class UserToStationRepositoryModule { }