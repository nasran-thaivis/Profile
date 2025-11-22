import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
