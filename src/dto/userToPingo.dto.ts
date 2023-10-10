import { AutoMap } from "@automapper/classes";
import PingoDto from "./pingo.dto";
import { RoleDto } from "./role.dto";
import UserDto from "./user.dto";

export class UserToPingoDto {

    @AutoMap()
    id?: string;

    @AutoMap(() => UserDto)
    user: UserDto;

    @AutoMap(() => RoleDto)
    role: RoleDto;

    @AutoMap(() => PingoDto)
    pingo: PingoDto;
    
}
