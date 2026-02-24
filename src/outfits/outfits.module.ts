import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';

@Module({
  controllers: [OutfitsController],
  providers: [OutfitsService],
})
export class OutfitsModule {}
