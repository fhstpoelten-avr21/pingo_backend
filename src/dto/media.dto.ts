import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from './meta.dto';
import { AutoMap } from '@automapper/classes';

export default class MediaDto extends MetaDto {

  @AutoMap()
  @IsOptional()
  @IsString()
  id: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ description: 'Name of the media', example: 'My Image' })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ description: 'Type of the media', example: 'image/png' })
  type: string;

  @AutoMap()
  @IsUrl()
  @ApiProperty({ description: 'URL of the media', example: 'https://example.com/images/my-image.png' })
  url: string;

}