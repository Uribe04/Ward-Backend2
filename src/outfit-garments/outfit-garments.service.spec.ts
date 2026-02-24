import { Test, TestingModule } from '@nestjs/testing';
import { OutfitGarmentsService } from './outfit-garments.service';

describe('OutfitGarmentsService', () => {
  let service: OutfitGarmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutfitGarmentsService],
    }).compile();

    service = module.get<OutfitGarmentsService>(OutfitGarmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
