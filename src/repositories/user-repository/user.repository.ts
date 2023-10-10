import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../model/entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { UserSearchQuery } from 'src/model/local/userQueries';

export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username: username } })
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async findByQuery(query: UserSearchQuery): Promise<User[]> {

        let selectQuery: SelectQueryBuilder<User> = this.userRepository.createQueryBuilder("user")
            .where(
                new Brackets((qr) => {
                    qr.where('user.username like :query', { query: `%${query?.search}%` })
                    qr.orWhere('user.firstname like :query', { query: `%${query?.search}%` })
                    qr.orWhere('user.lastname like :query', { query: `%${query?.search}%` })
                    qr.orWhere('user.email like :query', { query: `%${query?.search}%` })
                })
            )

        return await selectQuery.getMany();
    }
}
