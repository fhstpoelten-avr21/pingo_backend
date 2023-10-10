import { Repository } from 'typeorm';
import { Role } from '../../model/entities/role.entity';
import {InjectRepository} from "@nestjs/typeorm";

export class RoleRepository {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {}

    async saveRole(role: Role): Promise<Role> {
        // throw new Error( role.description);
        return await this.roleRepository.save(role);
    }

    async findRoleById(id: number): Promise<Role> {
        return await this.roleRepository.findOne({ where: { id: id } });
    }

    async deleteRole(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }

    async findAllRoles(): Promise<Role[]> {
        // return null;
        return await this.roleRepository.find();
    }

}
