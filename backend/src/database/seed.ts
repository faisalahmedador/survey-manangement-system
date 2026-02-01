import {DataSource} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Role} from "../common/enums/role/role";
import {User} from "../user/user";

export async function seed(dataSource: DataSource) {
    const repo = dataSource.getRepository(User);

    const passwordHash = await bcrypt.hash('password123', 10);

    const adminEmail = 'admin@example.com';
    const officerEmail = 'officer@example.com';

    console.log('Checking for existing users...');
    const existingAdmin = await repo.findOneBy({ email: adminEmail });
    const existingOfficer = await repo.findOneBy({ email: officerEmail });

    console.log('Admin user status:', existingAdmin ? 'Found' : 'Not found');
    console.log('Officer user status:', existingOfficer ? 'Found' : 'Not found');

    if (!existingAdmin) {
        await repo.save({
            name: 'Admin User',
            email: adminEmail,
            passwordHash,
            role: Role.ADMIN,
        });
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }

    if (!existingOfficer) {
        await repo.save({
            name: 'Officer User',
            email: officerEmail,
            passwordHash,
            role: Role.OFFICER,
        });
        console.log('Officer user created');
    } else {
        console.log('Officer user already exists');
    }
}