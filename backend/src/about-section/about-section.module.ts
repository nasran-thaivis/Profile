import { Module } from '@nestjs/common';
import { AboutSectionService } from './about-section.service';
import { AboutSectionController } from './about-section.controller';

@Module({
  controllers: [AboutSectionController],
  providers: [AboutSectionService],
})
export class AboutSectionModule {}
