import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AboutSectionService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(): Promise<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    update(createAboutSectionDto: CreateAboutSectionDto): import(".prisma/client").Prisma.Prisma__AboutSectionClient<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
