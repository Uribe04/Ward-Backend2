import { Test, TestingModule } from '@nestjs/testing';
import { OutfitGarmentsController } from './outfit-garments.controller';
import { OutfitGarmentsService } from './outfit-garments.service';

describe('OutfitGarmentsController', () => {
  let controller: OutfitGarmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutfitGarmentsController],
      providers: [OutfitGarmentsService],
    }).compile();

    controller = module.get<OutfitGarmentsController>(OutfitGarmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
