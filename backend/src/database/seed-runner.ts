import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { seed } from './seed';
import { User } from '../user/user';
import { Surveys } from '../surveys/surveys';
import { Fields } from '../fields/fields';
import { FieldOptions } from '../fields/field-options';
import { Submissions } from '../submissions/submissions';
import { SubmissionAnswer } from '../submissions/submissionAnswer';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'survey_db',
    entities: [User, Surveys, Fields, FieldOptions, Submissions, SubmissionAnswer],
    synchronize: true,
});

async function runSeed() {
    console.log('Seeding process started...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_USER:', process.env.DB_USERNAME);
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');
        await seed(AppDataSource);
        console.log('Seeding completed successfully');
        await AppDataSource.destroy();
    } catch (err: any) {
        console.error('Error during seeding:');
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);
        process.exit(1);
    }
}

runSeed();
