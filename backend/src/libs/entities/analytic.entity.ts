import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Index(['user_id', 'date'], { unique: true })
@Entity({ name: 'analytic' })
export class AnalyticEntity {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column('numeric', { nullable: false })
  schedule_busy_minutes!: number;

  @Column({ type: 'date', nullable: false })
  date!: string;

  @ManyToOne(() => UserEntity, (u) => u._id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'uuid', nullable: false })
  user_id!: string;
}
