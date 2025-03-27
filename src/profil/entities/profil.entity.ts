import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Author, (author) => author.profile)
  author: Author;
}
