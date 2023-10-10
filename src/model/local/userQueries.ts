import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserSearchQuery{
    @ApiProperty({title: "search", description: "search key (word/characters)", required: false})
    @IsOptional()
    @IsString()
    search: string = "";

    // currently unimplemented; will be ignored
    @ApiProperty({title: "take", description: "how many pages to show at once? (pagination) => currently unimplemented, will be ignored", required: false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    take: number;

    // currently uninplemented; will be ignored
    @ApiProperty({title: "skip", description: "how many pages to skip? (pagination) => currently unimplemented, will be ignored", required: false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    skip: number;
}