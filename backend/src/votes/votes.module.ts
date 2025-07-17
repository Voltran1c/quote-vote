import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { QuotesModule } from '../quotes/quotes.module';
import { Vote } from './entities/vote.entity';
import { UsersModule } from '../users/users.module';
import { Quote } from '@/quotes/entities/quote.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Quote,Vote]), QuotesModule, UsersModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}