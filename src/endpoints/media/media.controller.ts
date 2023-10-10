import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {diskStorage, Multer} from 'multer';
import {v4 as uuid} from 'uuid';
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {MediaService} from '../../services/media.service';
import Media from '../../model/entities/media.entity';
import {FileInterceptor} from '@nestjs/platform-express';
import * as path from 'path';
import MediaDto from 'src/dto/media.dto';


@ApiTags('media')
@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Get()
    @ApiOperation({ summary: 'Get all Media' })
    @ApiOkResponse({ description: 'Media found successfully', type: Media, isArray: true })
    async getAllMedia() {
        return await this.mediaService.getAllMedia();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        try {
            const key = await this.mediaService.uploadFile(file.buffer, file.originalname);
            return {key}
        } catch (error) {
            throw new Error('Failed to upload file: ' + error.message);
        }
    }
    @Get(':id')
    @ApiOkResponse({ description: 'Media found successfully', type: Media })
    async getMediaById(
        @Param('id') 
        id: string): Promise<Media> {
        return await this.mediaService.getMediaById(id);
    }

    @Get('getByPingoId/:id')
    @ApiOkResponse({ description: 'Media found successfully', type: Media })
    async getMediaByPingoId(
        @Param('id')
            id: string): Promise<string> {
        return await this.mediaService.getMediaByPingoId(id);
    }

}
