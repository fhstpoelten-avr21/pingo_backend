import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserToPingoService} from "../../services/userToPingo.service";
import { UserToPingoDto } from 'src/dto/userToPingo.dto';


@Controller('userToPingo')
export class UserToPingoController {
    constructor(private userToPingoService: UserToPingoService) {
    }
    
    @Post("saveUser/:hashId/:userId")
    saveUserToStation(
        @Param("hashId") hashId: string,
        @Param("userId") userId: string){
        return this.userToPingoService.saveUser(hashId, userId)
    }

    @Get(":pingoId")
    getUserToPingoByPingoId(@Param('pingoId') pingoId: string){
        return this.userToPingoService.getUserToPingoByPingoId(pingoId);
    }

    @Post()
    saveUserToPingo(@Body() userToPingo: UserToPingoDto){
        return this.userToPingoService.saveUserToPingo(userToPingo);
    }

    @Delete(":id")
    deleteUserToPingo(@Param('id') id: string){
        return this.userToPingoService.deleteUserToPingo(id);
    }
}
