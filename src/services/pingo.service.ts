import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import PingoDto from "src/dto/pingo.dto";
import Pingo from "src/model/entities/pingo.entity";
import PingoRepository from "src/repositories/pingo-repository/pingo.repository";

@Injectable()
export default class PingoService {

    constructor(
        private pingoRepository: PingoRepository,
        @InjectMapper() private mapper: Mapper
    ) { }

    async getByGeo(lat: number, lng: number, radius: number, userId): Promise<PingoDto[]> {
        const pingos = await this.pingoRepository.getByGeo(lat, lng, radius, userId);
        return this.mapper.mapArray(pingos, Pingo, PingoDto);
    }

    async getById(id: string, userId: string) {
        const pingo = await this.pingoRepository.getById(id, userId);

        if (pingo) {
            return this.mapper.map(pingo, Pingo, PingoDto)
        }
        throw new NotFoundException("Pingo not found by this id");
    }

    async getByUserId(id: string, role: string): Promise<PingoDto[]> {
        const pingos = await this.pingoRepository.getByUserId(id, role);

        return this.mapper.mapArray(pingos, Pingo, PingoDto);
    }

    async getAll() {
        const pingos = await this.pingoRepository.getAllPingos();

        if (pingos && pingos.length) {

            const pingoDtos = this.mapper.mapArray(pingos, Pingo, PingoDto);

            return pingoDtos;
        }

        return [];
    }

    async deletePingo(id: string) {
        return await this.pingoRepository.deletePingo(id);
    }

    async updatePingo(pingoDto: PingoDto): Promise<PingoDto> {
        const existingEntity = await this.pingoRepository.getById(pingoDto.id);

        if (!existingEntity) {
            throw new NotFoundException("Entity not found!");
        }

        const pingo = await this.mapper.map(pingoDto, PingoDto, Pingo);

        Object.assign(existingEntity, pingo);

        const resPingo = await this.pingoRepository.savePingo(existingEntity);

        return this.mapper.map(pingo, Pingo, PingoDto);
    }

    async createPingo(pingoDto: PingoDto): Promise<PingoDto> {
        
        const pingo = this.mapper.map(pingoDto, PingoDto, Pingo);
        
        const resPingo = await this.pingoRepository.savePingo(pingo);

        return this.mapper.map(resPingo, Pingo, PingoDto);
    }

    async getPingoByHashId(hashId: string): Promise<PingoDto> {
        const pingo = await this.pingoRepository.getPingoByHashId(hashId);
        if (pingo) {
            return this.mapper.map(pingo, Pingo, PingoDto)
        }
        throw new NotFoundException("Pingo Not Found")

    }
}