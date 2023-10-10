import { InjectRepository } from "@nestjs/typeorm";
import {createQueryBuilder, Repository} from "typeorm";
import UserToStation from "../../model/entities/userToStation.entity";
import HashToStation from "../../model/entities/hashToStation.entity";
import HashToStationRepository from "../hash-to-station-repository/hashToStationRepository";
import {v4 as uuidv4} from 'uuid';


export default class UserToStationRepository {

    constructor(@InjectRepository(UserToStation) private repository: Repository<UserToStation>) { }

    async saveUser(stationId: string, roleId: string, userId: string): Promise<any> {
        const uuid = uuidv4();
        return await this.repository.query(`
            INSERT INTO user_to_station (id, done, userId,  stationId, roleId)
            VALUES (?, ?, ?, ?, ?)`, [uuid, 0, userId, stationId, roleId]);
    }

    getByStationAndUser(stationId: string, userId: string): Promise<UserToStation[]> {
        return this.repository.find(
            {
                relations: {
                    role: true,
                },
                where: {
                    station: { id: stationId },
                    user: { id: userId }
                },
            }
        )
    }
}