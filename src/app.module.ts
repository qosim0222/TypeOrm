import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entites/book.entities';
import { AuthorModule } from './author/author.module';
import { ProfilModule } from './profil/profil.module';
import { Author } from './author/entities/author.entity';
import { Profil } from './profil/entities/profil.entity';

@Module({
  imports: [BookModule,
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'qosim1207',
        database: 'n16',
        entities: [Book, Author, Profil],
        synchronize: true,
      }),
    AuthorModule,
    ProfilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
