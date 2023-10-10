import { InjectRepository } from "@nestjs/typeorm";
import UserToPingo from "src/model/entities/userToPingo.entity";
import { Repository } from "typeorm";
import {v4 as uuidv4} from 'uuid';



export default class UserToPingoRepository {

    constructor(@InjectRepository(UserToPingo) private repository: Repository<UserToPingo>) { }

    getByPingoId(id: string): Promise<UserToPingo[]> {
        return this.repository.find(
            {
                where: {
                    pingo: { id: id }
                },
                relations: {
                    user: true,
                    role: true
                }
            }
        )
    }

    getByPingoAndUser(pingoId: string, userId: string): Promise<UserToPingo[]>  {
        return this.repository.find(
            {
                relations: {
                    role: true,
                },
                where: {
                    pingo: {id: pingoId},
                    user: {id: userId}
                },
            }
        )
    }
    async saveUser(pingoId: string, roleId: string, userId: string): Promise<any> {
        const uuid = uuidv4();
        return await this.repository.query(`
            INSERT INTO user_to_pingo (id, userId, pingoId, roleId)
            VALUES (?, ?, ?, ?)`, [uuid, userId, pingoId, roleId]);
    }

    async saveUserToPingo(userToPingo: UserToPingo): Promise<UserToPingo>{
        return await this.repository.save(userToPingo);
    }

    async deleteUserToPingo(id: string){
        return await this.repository.delete(id);
    }
}