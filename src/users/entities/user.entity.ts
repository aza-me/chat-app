import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty()
  phone: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: true })
  @ApiProperty()
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty()
  bio: string;

  @Column({ nullable: true })
  @ApiProperty()
  birthdayDate: Date;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  async setPassword(password: string): Promise<{ salt: string; password: string }> {
    const salt = await bcrypt.genSalt();
    return {
      salt,
      password: await bcrypt.hash(password, salt),
    };
  }
}
