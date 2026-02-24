import { User } from 'src/users/entities/user.entity';
import { OutfitGarment } from 'src/outfit-garments/entities/outfit-garment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('outfits')
export class Outfit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  occasion: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.outfits)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OutfitGarment, (og) => og.outfit)
  outfit_garments: OutfitGarment[];
}
