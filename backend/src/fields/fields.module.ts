import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Fields} from "./fields";
import {FieldOptions} from "./field-options";

@Module({
    controllers: [FieldsController],
    providers: [FieldsService],
    imports: [
        TypeOrmModule.forFeature([Fields, FieldOptions])
    ],
    exports: [FieldsService]
})
export class FieldsModule {}
