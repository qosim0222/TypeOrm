import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entites/book.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([Book,Author])],
})
export class BookModule {}
