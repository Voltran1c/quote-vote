import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quote } from '../../quotes/entities/quote.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Quote, quote => quote.votes)
  quote: Quote;
}