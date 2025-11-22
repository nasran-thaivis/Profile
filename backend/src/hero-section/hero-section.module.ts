import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [HeroSectionController],
  providers: [HeroSectionService],
})
export class HeroSectionModule {}
