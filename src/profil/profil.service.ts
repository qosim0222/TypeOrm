import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { Author } from 'src/author/entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';

@Injectable()
export class ProfilService {
  constructor(
    @InjectRepository(Profil) private profile: Repository<Profil>,
    @InjectRepository(Author) private author: Repository<Author>,
  ){}
 async create(createProfilDto: CreateProfilDto) {
    let { author, ...data } = createProfilDto;
    try {
      let author = await this.author.findOne({
        where: { id: createProfilDto.author },
      });

      if (!author) {
        return new NotFoundException('Not found author');
      }

      let profile = this.profile.create(data);
      author.profile = await this.profile.save(profile);
      await this.author.save(author);

      return { data: profile };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.profile.find({ relations: ['author'] });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      let data = await this.profile.findOne({
        where: { id },
        relations: ['author'],
      });
      if (!data) {
        return new NotFoundException('Not found profile');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: number, updateProfileDto: UpdateProfilDto) {
    let { email, phone } = updateProfileDto;
    try {
      let profile = await this.profile.findOne({ where: { id } });
      if (!profile) {
        return new NotFoundException('Not found profile');
      }

      profile.email = phone || profile.phone;
      profile.email = email || profile.email;

      return this.profile.save(profile);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    let data = await this.profile.findOne({ where: { id } });
    if (!data) {
      return new NotFoundException('Not found profile');
    }
    await this.profile.delete(id);
    return { data };
  }
}
