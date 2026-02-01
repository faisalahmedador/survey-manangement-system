import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../user/user";
import {SubmissionAnswer} from "./submissionAnswer";
import {Surveys} from "../surveys/surveys";

@Entity('submissions')
export class Submissions {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Surveys)
    @JoinColumn({ name: 'survey_id' })
    survey: Surveys;

    @OneToMany(() => SubmissionAnswer, submissionAnswer => submissionAnswer.submission, {
        cascade: ['insert', 'update'],
    })
    submissionAnswers: SubmissionAnswer[];
}
