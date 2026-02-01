import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../common/enums/role/role";
import {Surveys} from "../surveys/surveys";
import {Submissions} from "../submissions/submissions";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: Role
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Surveys, survey => survey.user)
    surveys: Surveys[];

    @OneToMany(() => Submissions, submission => submission.user)
    submissions: Submissions[];
}
