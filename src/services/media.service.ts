import {Injectable, NotFoundException} from '@nestjs/common';


import Media from 'src/model/entities/media.entity';
import {MediaRepository} from 'src/repositories/media.repository/media.repository';
import {Mapper} from '@automapper/core';
import {InjectMapper} from '@automapper/nestjs';
import {S3} from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class MediaService {
    private readonly s3: S3;
    private urlPrefix: string = 'https://pingo.s3-eu-north-1.amazonaws.com/';

    constructor(
        private mediaRepository: MediaRepository,
        @InjectMapper() private mapper: Mapper,
    ) {
        this.s3 = new S3();
    }

    async uploadFile(
        fileBuffer: Buffer,
        originalName: string
    ): Promise<string> {
        const key = this.generateUniqueKey(originalName);
        await this.uploadToS3(fileBuffer, key);
        return this.urlPrefix + key;
    }

    private generateUniqueKey(originalName: string): string {
        const uniquePart = uuidv4();
        const extension = originalName.split('.').pop();
        return `${uniquePart}.${extension}`;
    }

    private async uploadToS3(fileBuffer: Buffer, key: string): Promise<void> {
        const uploadParams = {
            Bucket: 'pingo',
            Key: key,
            Body: fileBuffer,
        };
        try {
            await this.s3.upload(uploadParams).promise();
        } catch (error) {
            throw new Error('Failed to upload file: ' + error);
        }
    }
    async getAllMedia(): Promise<Media[]> {
        return await this.mediaRepository.findAllMedias();
    }

    async getMediaById(id: string): Promise<Media> {
        return await this.mediaRepository.findMediaById(id);
    }

    async getMediaByPingoId(id: string): Promise<string> {
        const media = await this.mediaRepository.findMediaByPingoId(id);

        if (!media) {
            throw new NotFoundException(`Media with pingo_id ${id} not found`);
        }
        return media.url;
    }

    /*    async uploadFile(
            fileBuffer: Buffer,
            originalName: string,
            idPingo: boolean,
            toId: string
        ): Promise<string> {
            const key = this.generateUniqueKey(originalName);
            const media = this.createMediaObject(originalName, key, toId, idPingo);

            await this.saveMedia(media);
            await this.uploadToS3(fileBuffer, key);

            return media.url;
        }
        private createMediaObject(
            originalName: string,
            key: string,
            toId: string,
            idPingo: boolean
        ): Media {
            const parts = originalName.split('.');
            const media = new Media();
            media.name = parts[0];
            media.type = parts[1];
            media.url = this.urlPrefix + key;

            if (idPingo) {
                media.pingo = { id: toId } as any;
            } else {
                media.station = { id: toId } as any;
            }

            return media;
        }

        private async saveMedia(media: Media): Promise<void> {
            await this.mediaRepository.saveMedia(media);
        } */
}
