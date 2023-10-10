import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { StationDto } from "../dto/station.dto";
import StationMapper from "../mapper/station.mapper.service";
import Station from "../model/entities/station.entity";
import PingoRepository from "../repositories/pingo-repository/pingo.repository";
import { StationRepository } from "../repositories/station-repository/station.repository";

@Injectable()
export class StationService {
    constructor(
        private stationRepository: StationRepository,
        private pingoRepository: PingoRepository,
        @InjectMapper() private readonly mapper: Mapper
    ) {}

    async saveStation(stationDTO: StationDto, pingoId: string){
        const pingo = await this.pingoRepository.getById(pingoId);
        const station = await this.mapper.map(stationDTO, StationDto, Station);
        station.pingo = pingo;
        const newStation = await this.stationRepository.saveStation(station);
        return this.mapper.map(newStation, Station, StationDto);
    }

    async getStationById(id: string): Promise<StationDto> {
        const station = await this.stationRepository.getStationById(id);

        if(station){
            return this.mapper.map(station, Station, StationDto);
        }

        throw new NotFoundException("station not found by id");
    }

    async getStationByUserId(userId:string, role: string): Promise<StationDto[]> {
        const stations = await this.stationRepository.getStationsByUserId(userId, role)
        return this.mapper.mapArray(stations, Station, StationDto);
    }

    async updateStation(stationDTO: StationDto){
        const existStation = await this.stationRepository.getStationById(stationDTO.id);
        if (!existStation){
            throw new NotFoundException();
        }
        const station = await this.mapper.map(stationDTO, StationDto, Station);
        const updatedStation = await this.stationRepository.saveStation(station);
        return this.mapper.map(updatedStation, Station, StationDto);
    }

    async deleteStation(id: string): Promise<void> {
        await this.stationRepository.deleteStation(id);
    }

    async getStationByGeo(lat: number, lng: number, radius: number){
        return await  this.stationRepository.getStationByGeo(lat,lng,radius);
    }

    async getStationByHashId(hashId: string): Promise<StationDto> {
        const station = await this.stationRepository.getStationByHashId(hashId);
        if (station){
            return this.mapper.map(station, Station, StationDto);
        }
        throw new NotFoundException("Station Not Found")

    }
}