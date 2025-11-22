import { Injectable } from '@nestjs/common';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class HeroSectionService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  // 1. ดึงข้อมูล Hero (ถ้าไม่มี ให้สร้าง Default ให้เลย)
  async findOne() {
    const hero = await this.prisma.heroSection.findUnique({
      where: { id: 1 }, // บังคับดูที่ ID = 1 เสมอ
    });

    let result;
    if (!hero) {
      // ถ้ายังไม่มีใน DB ให้สร้างค่าเริ่มต้นให้
      result = await this.prisma.heroSection.create({
        data: {
          id: 1,
          title: 'Welcome',
          description: 'This is my portfolio',
          imageUrl: 'https://placehold.co/1920x1080',
        },
      });
    } else {
      result = hero;
    }

    // แปลง imageUrl เป็น proxy URL ถ้ามี
    if (result.imageUrl) {
      result.imageUrl = this.uploadService.getProxyUrl(result.imageUrl);
    }

    return result;
  }

  // 2. อัปเดตข้อมูล Hero (ใช้ upsert: มีก็แก้ ไม่มีก็สร้าง)
  async update(updateHeroSectionDto: UpdateHeroSectionDto) {
    // แปลง proxy URL กลับเป็น path ก่อนบันทึกลง database
    const normalizedData = {
      ...updateHeroSectionDto,
      imageUrl: updateHeroSectionDto.imageUrl !== undefined
        ? (updateHeroSectionDto.imageUrl 
            ? this.uploadService.normalizeImageUrl(updateHeroSectionDto.imageUrl)
            : updateHeroSectionDto.imageUrl)
        : undefined,
    };

    const result = await this.prisma.heroSection.upsert({
      where: { id: 1 },
      update: normalizedData,
      create: {
        id: 1,
        title: 'Welcome',
        description: 'This is my portfolio',
        ...normalizedData,
      },
    });

    // แปลง path เป็น proxy URL เมื่อ return ให้ frontend
    if (result.imageUrl) {
      result.imageUrl = this.uploadService.getProxyUrl(result.imageUrl);
    }

    return result;
  }
}
