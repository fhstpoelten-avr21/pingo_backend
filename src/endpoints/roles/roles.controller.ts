import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/model/entities/role.entity';
import { RoleService } from 'src/services/role.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RoleService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Gets a Role by ID' })
    @ApiOkResponse({ description: 'Role successfully retrieved', type: RoleDto })
    getRoleById(@Param('id') id: number): Promise<RoleDto> {
        return this.roleService.getRoleById(id);
    }

    // to use this function you have to call localhost:3000/roles/ID
    @Get()
    @ApiOperation({ summary: 'Gets all existing Roles' })
    @ApiOkResponse({ description: 'All Roles successfully retrieved', type: RoleDto , isArray: true})
    getAllRoles(): Promise<RoleDto[]> {
        // return "All roles" 
        return this.roleService.getAllRoles();
    }

    // to use this function you have to call localhost:3000/roles
    @Post('save')
    @ApiOperation({ summary: 'Saves a new Role' })
    @ApiOkResponse({ description: 'Role successfully saved', type: RoleDto })
    saveRole(@Body() roleDTO: RoleDto): Promise<RoleDto>{
        // return "Role saved"
        return this.roleService.saveRole(roleDTO);
    }
}
