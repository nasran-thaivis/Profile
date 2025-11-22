import { Injectable } from '@nestjs/common';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutSectionService {
  constructor(private prisma: PrismaService) {}

  // 1. ดึงข้อมูล (ถ้าไม่มี ให้สร้าง Default)
  async findOne() {
    const about = await this.prisma.aboutSection.findUnique({
      where: { id: 1 }, // บังคับ ID = 1
    });

    if (!about) {
      return this.prisma.aboutSection.create({
        data: {
          id: 1,
          title: 'About Me',
          description: 'I am a passionate developer...',
          imageUrl: 'https://placehold.co/600x400',
        },
      });
    }
    return about;
  }

  // 2. อัปเดตข้อมูล (Upsert)
  update(createAboutSectionDto: CreateAboutSectionDto) {
    return this.prisma.aboutSection.upsert({
      where: { id: 1 },
      update: createAboutSectionDto,
      create: {
        id: 1,
        ...createAboutSectionDto,
      },
    });
  }
}