import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { AboutSectionService } from './about-section.service';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';

@Controller('about-section')
export class AboutSectionController {
  constructor(private readonly aboutSectionService: AboutSectionService) {}

  @Get()
  findOne() {
    return this.aboutSectionService.findOne();
  }

  @Patch()
  update(@Body() createAboutSectionDto: CreateAboutSectionDto) {
    return this.aboutSectionService.update(createAboutSectionDto);
  }

  @Post()
  create(@Body() createAboutSectionDto: CreateAboutSectionDto) {
    return this.aboutSectionService.update(createAboutSectionDto);
  }
}