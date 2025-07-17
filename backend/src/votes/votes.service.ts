import { Injectable } from '@nestjs/common';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { User } from '../users/entities/user.entity';
import { Quote } from '../quotes/entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async create(createVoteDto: CreateVoteDto, userId: number) {
    const existingVote = await this.votesRepository.findOne({
      where: { user: { id: userId }, quote: { id: createVoteDto.quoteId } },
    });

    if (existingVote) {
      throw new Error('You have already voted for this quote');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const quote = await this.quotesRepository.findOne({
      where: { id: createVoteDto.quoteId },
    });

    if (!user || !quote) {
      throw new Error('User or Quote not found');
    }

    const vote = this.votesRepository.create({ user, quote });
    return this.votesRepository.save(vote);
  }

  getUserVotes(userId: number) {
    return this.votesRepository.find({
      where: { user: { id: userId } },
      relations: ['quote'],
    });
  }

  async getVoteResults() {
    return this.quotesRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.votes', 'vote')
      .select(['quote.id', 'quote.text', 'quote.author'])
      .addSelect('COUNT(vote.id)', 'votesCount')
      .groupBy('quote.id')
      .orderBy('votesCount', 'DESC')
      .getRawMany();
  }
}