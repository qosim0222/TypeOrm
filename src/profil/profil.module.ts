import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entites/book.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Profil,Author,Book])],
  controllers: [ProfilController],
  providers: [ProfilService],
})
export class ProfilModule {}
