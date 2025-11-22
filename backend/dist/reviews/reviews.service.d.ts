import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ReviewsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(createReviewDto: CreateReviewDto): Promise<{
        id: string;
        name: string;
        rating: number;
        comment: string;
        avatarUrl: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        rating: number;
        comment: string;
        avatarUrl: string | null;
        createdAt: Date;
    }[]>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        name: string;
        rating: number;
        comment: string;
        avatarUrl: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
