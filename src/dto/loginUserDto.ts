import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}