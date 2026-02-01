import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Fields} from "./fields";

@Entity('survey_field_options')
export class FieldOptions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    optionLabel: string;

    @Column()
    optionValue: string;

    @ManyToOne(() => Fields, {
        cascade: true
    })
    @JoinColumn({ name: 'field_id' })
    fields: Fields;
}