import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class HeroSectionService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(): Promise<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        logoUrl: string | null;
    }>;
    update(updateHeroSectionDto: UpdateHeroSectionDto): import(".prisma/client").Prisma.Prisma__HeroSectionClient<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        logoUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
