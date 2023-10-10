import { StationDto } from 'src/dto/station.dto';
import { ApiProperty } from "@nestjs/swagger";
import MediaDto from "./media.dto";
import { MetaDto } from "./meta.dto";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested, isArray } from "class-validator";
import { Type } from 'class-transformer';
import { UserToPingoDto } from './userToPingo.dto';
import UserToPingo from 'src/model/entities/userToPingo.entity';
import { AutoMap } from '@automapper/classes';
import { HashToPingoDto } from './hashToPingo.dto';

export default class PingoDto extends MetaDto {

  @AutoMap()
  @ApiProperty({ description: 'Unique identifier of the pingo', })
  @IsOptional()
  id: string;

  @AutoMap()
  @ApiProperty({
    description: 'Indicates whether the pingo is public or not',
  })
  @IsBoolean()
  isPublic: boolean;

  @AutoMap()
  @ApiProperty({
    description: 'Indicates whether the pingo chat is active or not',
  })
  @IsBoolean()
  chat: boolean;


  @AutoMap()
  @ApiProperty({ description: 'Indicates whether the pingo is a snitzel or not', })
  @IsBoolean()
  isSnitzel: boolean;

  @AutoMap()
  @ApiProperty({ description: 'The name of the pingo', })
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty({ description: 'The description of the pingo', })
  @IsNotEmpty()
  @IsString()
  descr: string;

  @AutoMap(() => [MediaDto])
  @ApiProperty({ description: 'Media of the pingo (e.g. photos, videos...)', isArray: true})
  @IsOptional()
  @ValidateNested({each: true})
  media: MediaDto[] = [];
  
  @AutoMap(() => [StationDto])
  @ApiProperty({ description: 'Stations of the pingo', isArray: true})
  @IsOptional()
  @ValidateNested({each: true})
  stations: StationDto[] = []

  @AutoMap(() => [UserToPingoDto])
  @ApiProperty({ description: 'User of the pingo', isArray: true})
  @IsOptional()
  @ValidateNested({each: true})
  userToPingos: UserToPingoDto[] = [];

  @AutoMap(() => [HashToPingoDto])
  @ApiProperty({ description: 'Hash (share-links) of the pingo', isArray: true})
  @IsOptional()
  @ValidateNested({each: true})
  hashToPingos: HashToPingoDto[] = [];
}
