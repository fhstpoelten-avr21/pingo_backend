import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Pingo from "src/model/entities/pingo.entity";
import PingoRepository from "./pingo.repository";
import { UserToPingoRepositoryModule } from "../user-to-pingo-repository/userToPingoRepository.module";
import { StationRepository } from "../station-repository/station.repository";
import { StationRepositoryModule } from "../station-repository/stationRepository.module";
import { UserToStationRepositoryModule } from "../user-to-station-repository/userToStationRepository.module";

@Module({
    imports: [TypeOrmModule.forFeature([Pingo]), UserToPingoRepositoryModule, UserToStationRepositoryModule],
    providers: [PingoRepository],
    exports: [PingoRepository, TypeOrmModule]
})
export default class PingoRepositoryModule { }