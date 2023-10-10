import { IsNotEmpty, IsString } from "class-validator";

export default class JWT{
    @IsString()
    @IsNotEmpty()
    accessToken: string
}