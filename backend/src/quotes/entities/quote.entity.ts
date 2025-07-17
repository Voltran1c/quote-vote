import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from '../../votes/entities/vote.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @OneToMany(() => Vote, vote => vote.quote)
  votes: Vote[];
}