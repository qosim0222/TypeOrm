import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Book } from 'src/book/entites/book.entities';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private author: Repository<Author>,
    @InjectRepository(Book) private book: Repository<Book>,
    @InjectRepository(Profil) private profile: Repository<Profil>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      let data = this.author.create(createAuthorDto);
      return await this.author.save(data);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.author.find({ relations: ['books', 'profile'] });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      let data = await this.author.findOne({
        where: { id },
        relations: ['books', 'profile'],
      });
      if (!data) {
        return new NotFoundException('Not found author');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      let data = await this.author.findOne({ where: { id } });
      if (!data) {
        return new NotFoundException('Not found author');
      }
      await this.author.update(id, updateAuthorDto);
      return this.findOne(id);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    let data = await this.author.findOne({ where: { id } });
    if (!data) {
      return new NotFoundException('Not found author');
    }

    await this.author.delete(id);
    return { data };
  }
}
