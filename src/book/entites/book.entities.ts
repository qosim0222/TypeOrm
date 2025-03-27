import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
