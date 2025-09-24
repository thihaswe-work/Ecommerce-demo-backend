import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  password: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 1024, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
