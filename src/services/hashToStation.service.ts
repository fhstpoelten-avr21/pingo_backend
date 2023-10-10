import {Injectable} from '@nestjs/common';
import HashToStationRepository from "../repositories/hash-to-station-repository/hashToStationRepository";
import PingoRepository from "../repositories/pingo-repository/pingo.repository";
import {StationRepository} from "../repositories/station-repository/station.repository";


@Injectable()
export class HashToStationService {
    constructor(
        private hashToStationRepository: HashToStationRepository, private pingoRepository: PingoRepository, private stationRepository: StationRepository
    ) {}

    async createHash(roleId: string, stationId: string, expireDate: Date): Promise<any> {
        const stationHashId = await this.hashToStationRepository.createHash(roleId, stationId, expireDate)
        const station = await this.stationRepository.getStationById(stationId)
        const pingo = await this.pingoRepository.getById(station["pingo_id"])
        return {stationHashId,pingo}
    }

    }
