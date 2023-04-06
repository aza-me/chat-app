import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  birthdayDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async setPassword(password: string): Promise<{ salt: string; password: string }> {
    const salt = await bcrypt.genSalt();
    return {
      salt,
      password: await bcrypt.hash(password, salt),
    };
  }
}
