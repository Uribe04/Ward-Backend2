import { Role } from 'src/roles/entities/role.entity';
import { Outfit } from 'src/outfits/entities/outfit.entity';
import { Garment } from 'src/garments/entities/garment.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Outfit, (outfit) => outfit.user)
  outfits: Outfit[];

  @OneToMany(() => Garment, (garment) => garment.user)
  garments: Garment[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
