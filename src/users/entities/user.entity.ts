import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsEmail, Min, IsPhoneNumber, IsString, MaxLength, IsDateString } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @IsPhoneNumber()
  phone: string;

  @Column()
  @IsString()
  @Min(8)
  password: string;

  @Column()
  @IsString()
  @MaxLength(20)
  firstName: string;

  @Column()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @Column()
  @IsDateString()
  birthdayDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
