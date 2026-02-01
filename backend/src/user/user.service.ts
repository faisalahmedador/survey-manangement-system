import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findOne({ where: {email}})
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepo.findOne({ where: {id}})
    }

    async create(user: Partial<User>): Promise<User> {
        return await this.userRepo.save(user)
    }

}
