import { User } from 'src/users/entities/user.entity';
import { OutfitGarment } from 'src/outfit-garments/entities/outfit-garment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('garments')
export class Garment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  color: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  user_count: number;

  @ManyToOne(() => User, (user) => user.garments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OutfitGarment, (og) => og.garment)
  outfit_garments: OutfitGarment[];
}
