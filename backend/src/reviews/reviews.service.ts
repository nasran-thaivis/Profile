import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  // 1. เพิ่มรีวิวใหม่
  async create(createReviewDto: CreateReviewDto) {
    // แปลง rating ให้เป็น number เสมอ (กันเหนียว)
    // แปลง proxy URL กลับเป็น path ก่อนบันทึกลง database
    const data = {
      ...createReviewDto,
      rating: Number(createReviewDto.rating),
      avatarUrl: createReviewDto.avatarUrl 
        ? this.uploadService.normalizeImageUrl(createReviewDto.avatarUrl)
        : createReviewDto.avatarUrl,
    };
    
    const review = await this.prisma.review.create({ data });

    // แปลง path เป็น proxy URL เมื่อ return ให้ frontend
    if (review.avatarUrl) {
      review.avatarUrl = this.uploadService.getProxyUrl(review.avatarUrl);
    }

    return review;
  }

  // 2. ดึงรีวิวทั้งหมด (เรียงจากใหม่ไปเก่า)
  async findAll() {
    const reviews = await this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // แปลง avatarUrl เป็น proxy URL สำหรับแต่ละ review
    return reviews.map((review) => {
      if (review.avatarUrl) {
        review.avatarUrl = this.uploadService.getProxyUrl(review.avatarUrl);
      }
      return review;
    });
  }

  // 3. ลบรีวิว
  remove(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}