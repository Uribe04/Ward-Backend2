import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Outfit } from 'src/outfits/entities/outfit.entity';
import { Garment } from 'src/garments/entities/garment.entity';

@Entity('outfit_garments')
export class OutfitGarment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Outfit, (outfit) => outfit.outfit_garments)
  @JoinColumn({ name: 'outfit_id' })
  outfit: Outfit;

  @ManyToOne(() => Garment, (garment) => garment.outfit_garments)
  @JoinColumn({ name: 'garment_id' })
  garment: Garment;
}
