import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createVoteDto: CreateVoteDto, @Request() req) {
    return this.votesService.create(createVoteDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserVotes(@Request() req) {
    return this.votesService.getUserVotes(req.user.userId);
  }

  @Get('results')
  getVoteResults() {
    return this.votesService.getVoteResults();
  }
}