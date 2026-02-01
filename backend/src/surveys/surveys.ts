import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Fields} from "../fields/fields";
import {User} from "../user/user";
import {Submissions} from "../submissions/submissions";

@Entity('survey')
export class Surveys {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Fields, fields => fields.surveys, {
        cascade: true,
    })
    fields: Fields[];

    @OneToMany(() => Submissions, submission => submission.survey)
    submissions: Submissions[];

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

}
