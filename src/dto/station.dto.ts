
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateIf, ValidateNested } from 'class-validator';
import MediaDto from "./media.dto";
import { MetaDto } from "./meta.dto";
import { UserToStationDto } from './userToStation.dto';

export class StationDto extends MetaDto {
  
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsString()
  id: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descr: string;

  @AutoMap()
  @ApiProperty()
  @IsBoolean()
  chat: boolean;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsString()
  secret: string;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  rank: number;

  @AutoMap()
  @ApiProperty()
  @ValidateIf((object, value) => !!object.secret || !!value)
  @IsNotEmpty()
  @IsString()
  question: string;

  @AutoMap(() => [MediaDto])
  @ApiProperty({ type: MediaDto, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media: MediaDto[] = [];

  @AutoMap(() => [UserToStationDto])
  @ApiProperty({ type: UserToStationDto, isArray: true })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserToStationDto)
  userToStations: UserToStationDto[] = [];
}
