import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  username: string;
  @Column()
  passwordHash: string;
  @Column()
  email: string;
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
