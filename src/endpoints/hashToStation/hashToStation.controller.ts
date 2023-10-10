import {Controller, Get, Param, Post} from '@nestjs/common';
import {HashToPingoService} from "../../services/hashToPingo.service";
import {HashToStationService} from "../../services/hashToStation.service";

@Controller('hashToStation')
export class HashToStationController {
    constructor(private readonly hashToStationService: HashToStationService) {
    }

    @Post('createHash/:roleId/:stationId/:expireDate')
    async createHash(
        @Param('roleId') roleId: string,
        @Param('stationId') stationId: string,
        @Param('expireDate') expireDate: Date)
    {
        return this.hashToStationService.createHash(roleId, stationId, expireDate)
    }
}
