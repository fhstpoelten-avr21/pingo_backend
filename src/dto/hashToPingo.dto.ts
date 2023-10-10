import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "./meta.dto";
import PingoDto from "./pingo.dto";
import { RoleDto } from "./role.dto";

export class HashToPingoDto extends MetaDto{

    @AutoMap()
    id?: string;

    @AutoMap()
    @ApiProperty({ description: 'Link expiration'})
    expireDate: string;

    @AutoMap(() => PingoDto)
    @ApiProperty({ description: 'Pingo reference'})
    pingo: PingoDto;

    @AutoMap(() => RoleDto)
    @ApiProperty({ description: 'Role reference'})
    role: RoleDto;
}
