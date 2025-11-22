import { Test, TestingModule } from '@nestjs/testing';
import { AboutSectionController } from './about-section.controller';
import { AboutSectionService } from './about-section.service';

describe('AboutSectionController', () => {
  let controller: AboutSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutSectionController],
      providers: [AboutSectionService],
    }).compile();

    controller = module.get<AboutSectionController>(AboutSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
