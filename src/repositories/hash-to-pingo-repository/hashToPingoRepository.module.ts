import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import HashToPingoRepository from "./hashToPingoRepository";
import HashToPingo from "../../model/entities/hashToPingo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([HashToPingo])],
    providers: [HashToPingoRepository],
    exports: [TypeOrmModule, HashToPingoRepository]
})
export class HashToPingoRepositoryModule { }