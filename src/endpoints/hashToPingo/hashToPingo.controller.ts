import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {HashToPingoService} from "../../services/hashToPingo.service";
import { HashToPingoDto } from 'src/dto/hashToPingo.dto';

@Controller('hashToPingo')
export class HashToPingoController {
    constructor(private readonly hashToPingoService: HashToPingoService) {
    }

    @Get(':role/:pingoId')
    async getLatestCreatedHashId(
        @Param('role') role: string,
        @Param('pingoId') pingoId: string) {

        return this.hashToPingoService.getLatestCreatedHashId(role, pingoId);
    }

    @Post('createHash/:roleId/:pingoId/:expireDate')
    async createHash(
        @Param('roleId') roleId: string,
        @Param('pingoId') pingoId: string,
        @Param('expireDate') expireDate: string)
    {
        return this.hashToPingoService.createHash(roleId, pingoId, expireDate)
    }

    @Delete(":id")
    deleteHash(@Param('id') id: string){
        return this.hashToPingoService.deleteHash(id);
    }
}
