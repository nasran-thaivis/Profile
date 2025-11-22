import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        name: string;
        createdAt: Date;
        rating: number;
        comment: string;
        avatarUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        rating: number;
        comment: string;
        avatarUrl: string | null;
    }[]>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        name: string;
        createdAt: Date;
        rating: number;
        comment: string;
        avatarUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
