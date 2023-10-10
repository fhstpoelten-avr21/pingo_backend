import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import HashToPingo from "../../model/entities/hashToPingo.entity";
import {v5 as uuidv5} from 'uuid';

export default class HashToPingoRepository {

    constructor(@InjectRepository(HashToPingo) private hashToPingoRepository: Repository<HashToPingo>) {
    }

    async findLatestCreatedHashId(role: string, pingo: string): Promise<HashToPingo> {
        const queryBuilder = this.hashToPingoRepository.createQueryBuilder("hashToPingo")
            .select("hashToPingo.id")
            .where('pingoId = :pingo', {pingo})
            .andWhere('roleId = :role', {role});

        return queryBuilder.getOne();
    }

    async createHash(roleId: string, pingoId: string, expireDate: string): Promise<HashToPingo> {
        const uuid = uuidv5(roleId + pingoId + expireDate, uuidv5.URL);
        await this.hashToPingoRepository.query(`
            INSERT INTO hash_to_pingo (id, roleId, pingoId, expireDate)
            VALUES (?, ?, ?, ?)
        `, [uuid, roleId, pingoId, expireDate]);

        return await this.hashToPingoRepository.findOne({
            where: {
                id: uuid
            },
            relations: {
                pingo: true,
                role: true
            }
        })
    }
    async getByHashId(hashId: string): Promise<any> {
        return await this.hashToPingoRepository.createQueryBuilder("hashToPingo")
            .leftJoin("hashToPingo.pingo", "pingo")
            .leftJoin("hashToPingo.role", "role")
            .where("hashToPingo.id = :id", { id: hashId })
            .addSelect(["pingo.id", "role.id"])
            .getOne();
    }

    async deleteHash(id: string): Promise<DeleteResult>{
        return await this.hashToPingoRepository.delete(id);
    }

}