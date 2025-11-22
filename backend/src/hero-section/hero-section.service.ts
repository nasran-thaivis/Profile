import { Injectable } from '@nestjs/common';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PrismaService } from '../prisma/prisma.service'; // 👈 ต้อง Import PrismaService

@Injectable()
export class HeroSectionService {
  constructor(private prisma: PrismaService) {}

  // 1. ดึงข้อมูล Hero (ถ้าไม่มี ให้สร้าง Default ให้เลย)
  async findOne() {
    const hero = await this.prisma.heroSection.findUnique({
      where: { id: 1 }, // บังคับดูที่ ID = 1 เสมอ
    });

    if (!hero) {
      // ถ้ายังไม่มีใน DB ให้สร้างค่าเริ่มต้นให้
      return this.prisma.heroSection.create({
        data: {
          id: 1,
          title: 'Welcome',
          description: 'This is my portfolio',
          imageUrl: 'https://placehold.co/1920x1080',
        },
      });
    }

    return hero;
  }

  // 2. อัปเดตข้อมูล Hero (ใช้ upsert: มีก็แก้ ไม่มีก็สร้าง)
  update(updateHeroSectionDto: UpdateHeroSectionDto) {
    return this.prisma.heroSection.upsert({
      where: { id: 1 },
      update: updateHeroSectionDto,
      create: {
        id: 1,
        title: 'Welcome',
        description: 'This is my portfolio',
        ...updateHeroSectionDto,
      },
    });
  }
}
