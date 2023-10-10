import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
// import data fakedata
import PingoDto from 'src/dto/pingo.dto';
import { JWTPayload } from 'src/model/local/decodedJWT';
import { DecodedJWT } from 'src/model/local/decodedJWT';
import { AuthService } from 'src/services/auth.service';
import PingoService from 'src/services/pingo.service';

@ApiTags('pingo')
@Controller('pingo')
export class PingoController {

    constructor(private pingoService: PingoService, private authService: AuthService) { }

    // to use this function you have to call localhost:3000/pingo
    @ApiOperation({ summary: 'Gets all existing Pingo' })
    @ApiOkResponse({ description: 'All Pingo successfully retrieved', type: PingoDto , isArray: true})
    @Get()
    public getAllPingo(): Promise<PingoDto[]> {
        return this.pingoService.getAll();
    }


    // to use this function you have to call localhost:3000/pingo/lat/lng/radius?game=true
    @ApiOperation({ summary: 'Gets Pingo in a certain radius' })
    @ApiOkResponse({ description: 'Pingo in the specified radius successfully retrieved', type: PingoDto , isArray: true})
    @Get(":lat/:lng/:radius/")
    public getPingo(
        @Param('lat') lat: number,
        @Param('lng') lng: number,
        @Param('radius') radius: number,
        @Req() req: Request
    ): Promise<PingoDto[]> {
        const jwt = req.headers.authorization;
        
        let decoded: JWTPayload = null;

        if(jwt){
            decoded = this.authService.decodeToken(jwt.split(" ")[1]);
        }
        
        return this.pingoService.getByGeo(Number(lat), Number(lng), Number(radius), decoded?.id);
    }

    // to use this function you have to call localhost:3000/pingo/121
    @ApiOperation({ summary: 'Get a Pingo by ID' })
    @ApiParam({ name: 'id', type: 'string', required: true })
    @ApiOkResponse({ description: 'Pingo successfully retrieved', type: PingoDto })  
    @Get("byId/:id")
    public getPingoById(@Param('id') id: string, @Req() req: Request): Promise<PingoDto> {
        const jwt = req.headers.authorization;
        
        let decoded: JWTPayload = null;

        if(jwt){
            decoded = this.authService.decodeToken(jwt.split(" ")[1]);
        }

        return this.pingoService.getById(id, decoded?.id);
    }

    // to use this function you have to call localhost:3000/pingo/byUser/1?role=owner/editor/visitor
    @ApiOperation({ summary: 'Get all Pingo of a user by user id' })
    @ApiParam({ name: 'id', type: 'string', required: true })
    @ApiParam({ name: 'role', type: 'string', required: false })
    @ApiOkResponse({ description: 'Pingos successfully retrieved', type: PingoDto, isArray: true })
    @Get("byUser/:id")
    public getPingoByUser(@Param('id') id: string, @Param('role') role: string): Promise<PingoDto[]> {
        return this.pingoService.getByUserId(id, role);
    }

    @ApiOperation({ summary: 'Updates a Pingo' })
    @ApiOkResponse({ description: 'Created Pingos returned', type: PingoDto })
    @Put()
    public updatePingo(@Body() pingoDto: PingoDto): Promise<PingoDto> {
        return this.pingoService.updatePingo(pingoDto);
    }

    @ApiOperation({ summary: 'Creates a Pingo' })
    @ApiOkResponse({ description: 'Pingos successfully created', type: PingoDto })
    @Post()
    public createPingo(@Body() pingoDto: PingoDto): Promise<PingoDto> {
        return this.pingoService.createPingo(pingoDto);
    }

    @ApiOperation({ summary: 'Delete a Pingo' })
    @ApiOkResponse({ description: 'Pingos successfully deleted' })
    @Delete(":id")
    public deletePingo(@Param("id") id: string) {
        return this.pingoService.deletePingo(id);
    }

    @Get("getByHashId/:hashId")
    public getPingoByHashId(@Param("hashId") hashId: string) {
        return this.pingoService.getPingoByHashId(hashId);
    }
}

