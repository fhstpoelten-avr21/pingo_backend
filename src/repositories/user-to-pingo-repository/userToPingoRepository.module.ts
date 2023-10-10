import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserToPingo from "src/model/entities/userToPingo.entity";
import UserToPingoRepository from "./userToPingoRepository";

@Module({
    imports: [TypeOrmModule.forFeature([UserToPingo])],
    providers: [UserToPingoRepository],
    exports: [TypeOrmModule, UserToPingoRepository]
})
export class UserToPingoRepositoryModule { }