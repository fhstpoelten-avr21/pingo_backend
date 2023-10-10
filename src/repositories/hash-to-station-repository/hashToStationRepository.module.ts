import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import HashToStation from "../../model/entities/hashToStation.entity";
import HashToStationRepository from "./hashToStationRepository";

@Module({
    imports: [TypeOrmModule.forFeature([HashToStation])],
    providers: [HashToStationRepository],
    exports: [TypeOrmModule, HashToStationRepository]
})
export class HashToStationRepositoryModule { }