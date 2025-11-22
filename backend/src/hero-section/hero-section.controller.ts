import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  // ดึงข้อมูล (GET /api/hero-section)
  // ไม่ต้องใส่ :id เพราะมีอยู่ชุดเดียว
  @Get()
  findOne() {
    return this.heroSectionService.findOne();
  }

  // แก้ไขข้อมูล (PATCH /api/hero-section)
  // รับข้อมูล Body มาอัปเดตเลย ไม่ต้องระบุ ID
  @Patch()
  update(@Body() updateHeroSectionDto: UpdateHeroSectionDto) {
    return this.heroSectionService.update(updateHeroSectionDto);
  }

  // เผื่อใครเผลอใช้ POST ก็ให้ทำงานเหมือน Update
  @Post()
  create(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    return this.heroSectionService.update(createHeroSectionDto);
  }
}
