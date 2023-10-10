import { AutoMap } from "@automapper/classes";
import { RoleDto } from "./role.dto";
import { StationDto } from "./station.dto";
import UserDto from "./user.dto";

export class UserToStationDto {

    @AutoMap()
    done: boolean;

    @AutoMap(() => UserDto)
    user: UserDto;

    @AutoMap(() => RoleDto)
    role: RoleDto;

    @AutoMap(() => StationDto)
    station: StationDto;
}
