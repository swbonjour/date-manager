import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ActivityTypeEnum } from '../dto/activity-type.enum';

@Index(['user_id', 'date'])
@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @ManyToOne(() => UserEntity, (u) => u._id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'uuid', nullable: false })
  user_id!: string;

  @Column({ type: 'text', nullable: false })
  label!: string;

  @Column({ type: 'text', enum: ActivityTypeEnum, nullable: false })
  type!: ActivityTypeEnum;

  @Column({ type: 'date', nullable: false })
  date!: string;

  @Column({ type: 'timestamp with time zone', nullable: false })
  start!: Date;

  @Column({ type: 'timestamp with time zone', nullable: false })
  finish!: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
