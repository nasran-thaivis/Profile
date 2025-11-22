import { Injectable } from '@nestjs/common';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class AboutSectionService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  // 1. ดึงข้อมูล (ถ้าไม่มี ให้สร้าง Default)
  async findOne() {
    const about = await this.prisma.aboutSection.findUnique({
      where: { id: 1 }, // บังคับ ID = 1
    });

    let result;
    if (!about) {
      result = await this.prisma.aboutSection.create({
        data: {
          id: 1,
          title: 'About Me',
          description: 'I am a passionate developer...',
          imageUrl: 'https://placehold.co/600x400',
        },
      });
    } else {
      result = about;
    }

    // แปลง imageUrl เป็น proxy URL ถ้ามี
    if (result.imageUrl) {
      result.imageUrl = this.uploadService.getProxyUrl(result.imageUrl);
    }

    return result;
  }

  // 2. อัปเดตข้อมูล (Upsert)
  async update(createAboutSectionDto: CreateAboutSectionDto) {
    // แปลง proxy URL กลับเป็น path ก่อนบันทึกลง database
    const normalizedData = {
      ...createAboutSectionDto,
      imageUrl: createAboutSectionDto.imageUrl !== undefined
        ? (createAboutSectionDto.imageUrl 
            ? this.uploadService.normalizeImageUrl(createAboutSectionDto.imageUrl)
            : createAboutSectionDto.imageUrl)
        : undefined,
    };

    const result = await this.prisma.aboutSection.upsert({
      where: { id: 1 },
      update: normalizedData,
      create: {
        id: 1,
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