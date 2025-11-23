import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('numeric')
  age!: number;

  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  password!: string;
}
