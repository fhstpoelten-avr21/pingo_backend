import {Injectable, NotFoundException} from "@nestjs/common";
import {UserRepository} from "../repositories/user-repository/user.repository";
import {UserMapper} from "../mapper/user.mapper.service";
import UserToStationRepository from "../repositories/user-to-station-repository/userToStationRepository";
import HashToStationRepository from "../repositories/hash-to-station-repository/hashToStationRepository";

@Injectable()
export class UserToStationService {
    constructor(
        private userToStationRepository: UserToStationRepository,
        private hashToStationRepository: HashToStationRepository,
    ) {}

    async saveUser(hashId: string, userId: string){
        const result = await this.hashToStationRepository.getByHashId(hashId);
        if (result != null){
            const stationId = result.stations.id
            const roleId = result.roles
            return await this.userToStationRepository.saveUser(stationId, roleId, userId);
        }
       return NotFoundException;



    }
}