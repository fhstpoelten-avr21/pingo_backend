import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v5 as uuidv5} from 'uuid';
import HashToStation from "../../model/entities/hashToStation.entity";

export default class HashToStationRepository {

    constructor(@InjectRepository(HashToStation) private hashToStationRepository: Repository<HashToStation>) {
    }


    async findHashId(role: string, station: string, expireDate: Date): Promise<HashToStation> {
        const queryBuilder = this.hashToStationRepository.createQueryBuilder("hashToStation")
            .select("hashToStation.id")
            .where('stationId = :station', {station})
            .andWhere('roleId = :role', {role})
            .andWhere('expireDate >= :expireDate', {expireDate});

        return queryBuilder.getOne();
    }

    async createHash(roleId: string, stationId: string, expireDate: Date): Promise<HashToStation> {
        const uuid = uuidv5(roleId + stationId + expireDate.toString(), uuidv5.URL);
        await this.hashToStationRepository.query(`
            INSERT INTO hash_to_station (id, roleId, stationId, expireDate)
            VALUES (?, ?, ?, ?)
        `, [uuid, roleId, stationId, expireDate]);

        const queryBuilder = this.hashToStationRepository.createQueryBuilder("hashToStation")
            .select("hashToStation.id")
            .where('id = :uuid', {uuid})

        return queryBuilder.getOne();
    }

    async getByHashId(hashId: string): Promise<any> {
        return await this.hashToStationRepository.createQueryBuilder("hashToStation")
            .leftJoin("hashToStation.station", "station")
            .leftJoin("hashToStation.roles", "role")
            .where("hashToStation.id = :id", { id: hashId })
            .addSelect(["station.id", "role.id"])
            .getOne();
    }
}