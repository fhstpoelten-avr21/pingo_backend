import {Controller, Param, Post} from '@nestjs/common';
import {UserToStationService} from "../../services/userToStation.service";

@Controller('userToStation')
export class UserToStationController {
    constructor(private userToStationService: UserToStationService) {
    }
    @Post("saveUser/:hashId/:userId")
    saveUserToStation(
        @Param("hashId") hashId: string,
        @Param("userId") userId: string){
        return this.userToStationService.saveUser(hashId, userId)
    }

}
