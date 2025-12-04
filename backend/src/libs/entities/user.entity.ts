import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column('text', { nullable: false })
  name!: string;

  @Column('date', { nullable: false })
  age!: string;

  @Column('text', { unique: true })
  email!: string;

  @Column('text', { nullable: false })
  password!: string;

  @Column('text', { nullable: false })
  timezone!: string;
}
