import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Submissions} from "./submissions";

@Entity('survey_answers')
export class SubmissionAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column()
    fieldLabel: string;

    @Column()
    fieldId: number;

    @ManyToOne(() => Submissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'submission_id' })
    submission: Submissions;
}
