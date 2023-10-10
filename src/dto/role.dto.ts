import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class RoleDto {
    @AutoMap()
    @IsOptional()
    @IsNumber()
    id: number;

    @AutoMap()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description: 'Name of the role',
        maxLength: 50
    })
    name: string;

    @AutoMap()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    @ApiProperty({
        description: 'Description of the role',
        maxLength: 250
    })
    description: string;
}
