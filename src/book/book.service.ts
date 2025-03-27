import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entites/book.entities';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private book: Repository<Book>,
    @InjectRepository(Author) private author: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    let { author, ...data } = createBookDto;
    try {
      let found = await this.author.findOne({ where: { id: author } });

      if (!found) {
        return new NotFoundException('Not found author');
      }

      let book = this.book.create(data);
      await this.book.save(book);

      if (found.books) {
        found.books.push(book);
      } else {
        found.books = [book];
      }

      await this.author.save(found);
      return { data: book };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.book.find();
  }

  async findOne(id: number) {
    try {
      let book = await this.book.findOne({ where: { id } });
      if (!book) {
        return new NotFoundException('Not found book');
      }

      return { data: book };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      let book = await this.book.findOne({ where: { id } });
      if (!book) {
        return new NotFoundException('Not found book');
      }
      return this.book.save(book);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    let data = await this.book.findOne({ where: { id } });
    if (!data) {
      return new NotFoundException('Not found book');
    }
    await this.book.delete(id);
    return { data };
  }
}
