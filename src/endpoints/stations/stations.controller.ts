import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StationService } from "../../services/station.service";
import { StationDto } from "../../dto/station.dto";

@Controller('stations')
export class StationsController {
    constructor(private readonly stationService: StationService) { }

    @Get("/search/:lat/:lng/:radius/")
    async getStationsByGeo(
        // lat and lng are the coordinates of the center of the radius
        @Param('lat') lat: number,
        @Param('lng') lng: number,
        @Param('radius') radius: number,
    ) {

        return await this.stationService.getStationByGeo(lat, lng, radius);
    }

    // to use this function you have to call localhost:3000/stations/search/lat/lng/radius
    @Get("byId/:id")
    async getStationById(@Param('id') id: string) {
        return await this.stationService.getStationById(id);
    }

    @Get("byUserId/:id/:role")
    async getStationByUserId(
        @Param('id') id: string,
        @Param('role') role: string) {
        return await this.stationService.getStationByUserId(id, role);
    }

    @Post("/:pingoId")
    async addStation(
        @Param('pingoId') pingoId: string,
        @Body() stationDTO: StationDto) {
        return await this.stationService.saveStation(stationDTO, pingoId);
    }

    @Put()
    async updateStation(
        @Body() stationDTO: StationDto
    ) {
        return await this.stationService.updateStation(stationDTO);
    }

    @Delete(":id")
    async deleteStation(
        @Param('id') id: string,
    ) {
        return await this.stationService.deleteStation(id);
    }

    @Get("getByHashId/:hashId")
    public getStationByHashId(@Param("hashId") hashId: string) {
        return this.stationService.getStationByHashId(hashId);
    }

}
