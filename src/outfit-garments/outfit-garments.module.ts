import { Module } from '@nestjs/common';
import { OutfitGarmentsService } from './outfit-garments.service';
import { OutfitGarmentsController } from './outfit-garments.controller';

@Module({
  controllers: [OutfitGarmentsController],
  providers: [OutfitGarmentsService],
})
export class OutfitGarmentsModule {}
