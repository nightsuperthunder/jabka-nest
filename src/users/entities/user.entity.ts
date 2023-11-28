import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column()
  @Field()
  firstName: string;
  @Column()
  @Field()
  username: string;
  @Column()
  @Field()
  passwordHash: string;
  @Column()
  @Field()
  email: string;
  @Column({ type: 'enum', enum: Role, default: Role.User })
  @Field(() => Role)
  role: Role;
}
