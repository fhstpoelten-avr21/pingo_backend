import { InjectRepository } from "@nestjs/typeorm";
import Pingo from "src/model/entities/pingo.entity";
import UserToPingoRepository from 'src/repositories/user-to-pingo-repository/userToPingoRepository';
import { Brackets, DeleteResult, Repository, SelectQueryBuilder } from "typeorm";
import UserToStationRepository from '../user-to-station-repository/userToStationRepository';

export default class PingoRepository {

    constructor(
        @InjectRepository(Pingo)
        readonly repository: Repository<Pingo>,
        readonly userToPingoRepository: UserToPingoRepository,
        readonly userToStationRepository: UserToStationRepository,
    ) { }

    async getById(id: string, userId?: string): Promise<Pingo> {
        const pingo = await this.repository.findOneBy({ id: id });

        if (userId) {
            pingo.userToPingos = await this.userToPingoRepository.getByPingoAndUser(id, userId);

            pingo.stations = await Promise.all(
                pingo.stations.map(async (station) => {
                    station.userToStations = await this.userToStationRepository.getByStationAndUser(station.id, userId);
                    return station;
                })
            )
        }

        return pingo;
    }

    getByUserId(id: string, role?: string): Promise<Pingo[]> {
        let selectQuery: SelectQueryBuilder<Pingo> = this.repository.createQueryBuilder("pingo")
            .leftJoinAndSelect('pingo.stations', 'station')
            .leftJoinAndSelect('pingo.media', 'media')
            .leftJoinAndSelect('station.media', 'stationMedia')
            .leftJoinAndSelect('pingo.hashToPingos', 'hashToPingo')
            .leftJoinAndSelect('hashToPingo.role', 'hashRole')
            .innerJoinAndSelect('pingo.userToPingos', 'userToPingo')
            .innerJoinAndSelect('userToPingo.user', 'user')
            .innerJoinAndSelect('userToPingo.role', 'role')
            .where('user.id = :id', { id })

        if (role && role !== "") {
            selectQuery.andWhere('role.name = :role', { role });
        }

        return selectQuery.getMany();
    }

    getByGeo(lat: number, lng: number, radius: number, userId: string): Promise<Pingo[]> {
        let selectQuery: SelectQueryBuilder<Pingo> = this.repository.createQueryBuilder("pingo")
            .leftJoinAndSelect('pingo.stations', 'station')
            .leftJoinAndSelect('pingo.media', 'media')
            .leftJoinAndSelect('station.media', 'stationMedia')
            .leftJoin('pingo.userToPingos', 'utp')
            .leftJoin('utp.user', 'utp_user')
            .leftJoin('utp.role', 'utp_role')
            .where('station.lng >= -180 and station.lng <= 180')
            .andWhere('station.lat >= -90 and station.lat <= 90')

        if (userId && userId !== "") {
            selectQuery.andWhere(
                new Brackets((qr) => {
                    qr.where('utp_user.id = :userId', { userId })
                    qr.orWhere('pingo.isPublic = true')
                })
            )
        } else {
            selectQuery.andWhere('pingo.isPublic = true');
        }

        selectQuery.addSelect(`ST_Distance_Sphere(POINT(:lng, :lat), POINT(station.lng, station.lat)) / 1000`, 'distance')
            .andWhere(`ST_Distance_Sphere(POINT(:lng, :lat), POINT(station.lng, station.lat)) <= :radius * 1000`, { lng, lat, radius })
            .orderBy('distance')

        return selectQuery.getMany();
    }

    async getAllPingos(): Promise<Pingo[]> {
        const res = await this.repository.createQueryBuilder("pingo")
            .leftJoinAndSelect('pingo.userToPingos', 'utp')
            .leftJoinAndSelect('pingo.media', 'media')
            .leftJoinAndSelect('pingo.stations', 'station')
            .leftJoinAndSelect('station.media', 'stationMedia')
            .leftJoinAndSelect('utp.user', 'user')
            .leftJoinAndSelect('utp.role', 'role').getMany();
        return res;
    }

    savePingo(pingo: Pingo): Promise<Pingo> {
        return this.repository.save(pingo);
    }

    saveAllPingos(pingos: Pingo[]): Promise<Pingo[]> {
        return this.repository.save(pingos)
    }

    deletePingo(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    getPingoByHashId(hashId: string): Promise<Pingo> {
        const queryBuilder = this.repository.createQueryBuilder("pingo")
            .leftJoinAndSelect("pingo.hashToPingos", "hashToPingo")
            .leftJoinAndSelect('pingo.media', 'media')
            .leftJoinAndSelect('pingo.stations', 'station')
            .leftJoinAndSelect('station.media', 'stationMedia')
            .where(`hashToPingo.id = :hashId`, { hashId })

        return queryBuilder.getOne();
    }

    kmToLatLng(km: number) {
        const lat = km / 110.574
        const lng = (km / 111.320) * Math.cos(lat)

        return [lat, lng];
    }
}