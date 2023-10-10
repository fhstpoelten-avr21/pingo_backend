import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../model/entities/user.entity';
import UserDto from "../dto/user.dto";
import { UserRepository } from "../repositories/user-repository/user.repository";
import { UserMapper } from "../mapper/user.mapper.service";
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserSearchQuery } from 'src/model/local/userQueries';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        @InjectMapper() private readonly mapper: Mapper,
    ) { }

    async saveUser(userDTO: UserDto): Promise<UserDto> {
        const user = this.mapper.map(userDTO, UserDto, User);
        const newUser = await this.userRepository.saveUser(user);
        return this.mapper.map(newUser, User, UserDto);
    }

    async registerUser(userDto: UserDto): Promise<UserDto> {
        const user = this.mapper.map(userDto, UserDto, User);

        user.salt = await user.genSalt();
        user.password = await user.hashPassword(userDto.password, user.salt);

        const newUser = await this.userRepository.saveUser(user);

        return this.mapper.map(newUser, User, UserDto);
    }

    async getUserById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findUserById(id)
        return this.mapper.map(user, User, UserDto);
    }

    async getUserBySearch(query: UserSearchQuery): Promise<UserDto[]> {
        const result = await this.userRepository.findByQuery(query);
        return this.mapper.mapArray(result, User, UserDto);
    }

    async getUserByUsername(username: string): Promise<UserDto> {
        const foundUser = await this.userRepository.findUserByUsername(username);

        if (foundUser) {
            this.mapper.map(foundUser, User, UserDto);
        }

        return foundUser;
    }

    async updateUser(userDTO: UserDto): Promise<UserDto> {
        const existUser = await this.userRepository.findUserById(userDTO.id);
        if (!existUser) {
            throw new NotFoundException();
        }
        const user = this.mapper.map(userDTO, UserDto, User);
        const updatedUser = await this.userRepository.saveUser(user);
        return this.mapper.map(updatedUser, User, UserDto);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}
