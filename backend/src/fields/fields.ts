import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FieldType} from "../common/enums/field-type/field-type";
import {Surveys} from "../surveys/surveys";
import {FieldOptions} from "./field-options";

@Entity('survey_fields')
export class Fields {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    type: FieldType;

    @Column()
    isRequired: boolean;

    @ManyToOne(() => Surveys, survey => survey.fields, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'survey_id' })
    surveys: Surveys;

    @OneToMany(() => FieldOptions, fieldOptions => fieldOptions.fields, {
        cascade: ['insert', 'update'],
        eager: true
    })
    fieldOptions: FieldOptions[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
