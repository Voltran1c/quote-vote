import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

findAll(search?: string, sort: 'asc' | 'desc' = 'asc') {
  const where = search ? { text: Like(`%${search}%`) } : {};
  return this.quotesRepository.find({
    where,
    order: {
      id: sort.toUpperCase() as 'ASC' | 'DESC'
    }
  });
}

  create(createQuoteDto: CreateQuoteDto) {
    const quote = this.quotesRepository.create(createQuoteDto);
    return this.quotesRepository.save(quote);
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return this.quotesRepository.update(id, updateQuoteDto);
  }

  remove(id: number) {
    return this.quotesRepository.delete(id);
  }
}