import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';

@Module({
  controllers: [HeroSectionController],
  providers: [HeroSectionService],
})
export class HeroSectionModule {}
