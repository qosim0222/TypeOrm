import { Book } from 'src/book/entites/book.entities';
import { Profil } from 'src/profil/entities/profil.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column()
    age:number

    @OneToOne(() => Profil)
    @JoinColumn()
    profile: Profil;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
