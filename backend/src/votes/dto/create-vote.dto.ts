import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNumber()
  @IsNotEmpty()
  quoteId: number;
}