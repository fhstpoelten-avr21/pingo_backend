import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserToPingoDto } from "src/dto/userToPingo.dto";
import UserToPingo from "src/model/entities/userToPingo.entity";
import HashToPingoRepository from "../repositories/hash-to-pingo-repository/hashToPingoRepository";
import UserToPingoRepository from "../repositories/user-to-pingo-repository/userToPingoRepository";

@Injectable()
export class UserToPingoService {
    constructor(
        private userToPingoRepository: UserToPingoRepository,
        private hashToPingoRepository: HashToPingoRepository,
        @InjectMapper() private mapper: Mapper
    ) { }

    async saveUser(hashId: string, userId: string) {
        const result = await this.hashToPingoRepository.getByHashId(hashId);
        if (result != null) {
            const pingoId = result.pingos.id
            const roleId = result.roles
            return await this.userToPingoRepository.saveUser(pingoId, roleId, userId);
        }
        return NotFoundException;
    }

    async getUserToPingoByPingoId(pingoId) {
        const result = await this.userToPingoRepository.getByPingoId(pingoId);

        return this.mapper.mapArray(result, UserToPingo, UserToPingoDto);
    }

    async saveUserToPingo(userToPingoDto: UserToPingoDto) {
        const entity = this.mapper.map(userToPingoDto, UserToPingoDto, UserToPingo);
        const result = await this.userToPingoRepository.saveUserToPingo(entity);

        return this.mapper.map(result, UserToPingo, UserToPingoDto);
    }

    async deleteUserToPingo(id: string){
        return await this.userToPingoRepository.deleteUserToPingo(id);
    }
}