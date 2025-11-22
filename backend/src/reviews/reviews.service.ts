import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  // 1. เพิ่มรีวิวใหม่
  create(createReviewDto: CreateReviewDto) {
    // แปลง rating ให้เป็น number เสมอ (กันเหนียว)
    const data = {
      ...createReviewDto,
      rating: Number(createReviewDto.rating)
    };
    
    return this.prisma.review.create({ data });
  }

  // 2. ดึงรีวิวทั้งหมด (เรียงจากใหม่ไปเก่า)
  findAll() {
    return this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. ลบรีวิว
  remove(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}