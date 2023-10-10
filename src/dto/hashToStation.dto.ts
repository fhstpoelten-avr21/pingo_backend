import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import Pingo from "src/model/entities/pingo.entity";
import { Role } from "src/model/entities/role.entity";
import { MetaDto } from "./meta.dto";
import Station from "src/model/entities/station.entity";

export class HashToStationDto extends MetaDto{

    @AutoMap()
    id: string;

    @AutoMap(() => Date)
    @ApiProperty({ description: 'Link expiration'})
    expireDate: Date;

    @AutoMap(() => Pingo)
    @ApiProperty({ description: 'Station reference'})
    station: Station;

    @AutoMap(() => Role)
    @ApiProperty({ description: 'Role reference'})
    roles: Role;
}
