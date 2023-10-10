import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

export default class UserDto {

    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    id: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
