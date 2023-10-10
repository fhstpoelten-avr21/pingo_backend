import { Repository } from 'typeorm';

import {InjectRepository} from "@nestjs/typeorm";
import Media from 'src/model/entities/media.entity';

export class MediaRepository {

    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>
    ) {}

    async saveMedia(media: Media): Promise<Media> {
        return await this.mediaRepository.save(media);
    }

    async findMediaById(id: string): Promise<Media> {
        return await this.mediaRepository.findOne({ where: { id: id } });
    }

    async findMediaByPingoId(id: string): Promise<Media> {
        return await this.mediaRepository.findOne({ where: { pingo: { id } } });
    }

    async deleteMedia(id: string): Promise<void> {
        await this.mediaRepository.delete(id);
    }

    async findAllMedias(): Promise<Media[]> {
        return await this.mediaRepository.find();
    }

}
