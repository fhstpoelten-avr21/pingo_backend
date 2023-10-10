import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { HashToPingoDto } from 'src/dto/hashToPingo.dto';
import HashToPingo from "../model/entities/hashToPingo.entity";
import HashToPingoRepository from "../repositories/hash-to-pingo-repository/hashToPingoRepository";

@Injectable()
export class HashToPingoService {
    constructor(
        private hashToPingoRepository: HashToPingoRepository,
        @InjectMapper() private mapper: Mapper
    ) { }

    async getLatestCreatedHashId(role: string, pingoId: string): Promise<HashToPingo> {
        return this.hashToPingoRepository.findLatestCreatedHashId(role, pingoId)
    }

    async createHash(roleId: string, pingoId: string, expireDate: string): Promise<HashToPingo> {
        return this.hashToPingoRepository.createHash(roleId, pingoId, expireDate)
    }

    async deleteHash(id: string){
        return await this.hashToPingoRepository.deleteHash(id);
    }
}
