import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StationRepository} from "./station.repository";
import Station from "../../model/entities/station.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Station])],
    providers: [StationRepository],
    exports: [TypeOrmModule, StationRepository]
})
export class StationRepositoryModule{}