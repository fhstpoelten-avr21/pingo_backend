import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import Station from "../../model/entities/station.entity";
import Pingo from "../../model/entities/pingo.entity";

export class StationRepository {
    constructor(
        @InjectRepository(Station)
        private stationRepository: Repository<Station>,
    ) { }

    saveStation(station: Station): Promise<Station> {
        return this.stationRepository.save(station);
    }

    async getStationById(id: string): Promise<Station> {
        return this.stationRepository.findOne({ where: { id: id } });
    }

    async getStationsByUserId(userId: string, role?: string): Promise<Station[]> {
        const stationQuery = this.stationRepository.createQueryBuilder("station")
            .innerJoinAndSelect('station.userToStations', 'userToStation')
            .innerJoinAndSelect("userToStation.users", "user")
            .innerJoinAndSelect("userToStation.roles", "role")
            .where("user.id = :userId", { userId: userId })
        if (role && role !== "") {
            stationQuery.andWhere("role.name = :roleName", { roleName: role });
        }
        return await stationQuery.getMany();
    }

    getStationsWithRoles(pingoId: string, userId: string): Promise<Station[]> {
        return this.stationRepository.find(
            {
                relations: {
                    userToStations: {
                        role: true
                    }
                },
                where: {
                    pingo: {id: pingoId},
                    userToStations: {
                        user: {
                            id: userId
                        }
                    }
                }
            }
        )
    }


    async deleteStation(id: string): Promise<void> {
        await this.stationRepository.delete(id);
    }

    async getStationByGeo(lat: number, lng: number, radius: number): Promise<Station[]> {
        let selectQuery: SelectQueryBuilder<Station> = this.stationRepository.createQueryBuilder("stations")
            .leftJoinAndSelect('stations.media', 'media')
            .addSelect(`ST_Distance_Sphere(POINT(${lng}, ${lat}), POINT(stations.lng, stations.lat)) / 1000`, 'distance')
            .andWhere(`ST_Distance_Sphere(POINT(${lng}, ${lat}), POINT(stations.lng, stations.lat)) <= ${radius * 1000}`)
            .orderBy('distance')
        return selectQuery.getMany();
    }

    getStationByHashId(hashId: string): Promise<Station> {
        const queryBuilder = this.stationRepository.createQueryBuilder("station")
            .leftJoinAndSelect("station.hashToStations", "hashToStation")
            .leftJoinAndSelect('station.media', 'media')
            .leftJoinAndSelect('station.pingo', 'pingos')
            .leftJoinAndSelect('pingos.media', 'pingosMedia')
            .where(`hashToStation.id = :hashId`, {hashId})

        return queryBuilder.getOne();

    }

}
