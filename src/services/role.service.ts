import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../model/entities/role.entity';
import { RoleDto } from "../dto/role.dto";
import { RoleRepository } from "../repositories/role-repository/role.repository";
import { RoleMapper } from "../mapper/role.mapper.service";
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class RoleService {

    constructor(
        private roleRepository: RoleRepository,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

    async saveRole(roleDto: RoleDto): Promise<RoleDto> {
        const role = this.mapper.map(roleDto, RoleDto, Role);
        const newRole = await this.roleRepository.saveRole(role);
        return this.mapper.map(newRole, Role, RoleDto);
    }

    async getRoleById(id: number): Promise<RoleDto> {
        const role = await this.roleRepository.findRoleById(id);

        return this.mapper.map(role, Role, RoleDto);
    }

    async updateRole(roleDto: RoleDto): Promise<RoleDto> {
        const existRole = await this.roleRepository.findRoleById(roleDto.id);

        if (!existRole) {
            throw new NotFoundException();
        }

        const role = this.mapper.map(roleDto, RoleDto, Role);
        const updatedRole = await this.roleRepository.saveRole(role);
        return this.mapper.map(updatedRole, Role, RoleDto);
    }

    async deleteRole(id: number): Promise<void> {
        return await this.roleRepository.deleteRole(id);
    }

    async getAllRoles(): Promise<RoleDto[]> {
        const roles = await this.roleRepository.findAllRoles();
        return this.mapper.mapArray(roles, Role, RoleDto);
    }
}
