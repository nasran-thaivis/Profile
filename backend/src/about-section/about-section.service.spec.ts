import { Test, TestingModule } from '@nestjs/testing';
import { AboutSectionService } from './about-section.service';

describe('AboutSectionService', () => {
  let service: AboutSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutSectionService],
    }).compile();

    service = module.get<AboutSectionService>(AboutSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
