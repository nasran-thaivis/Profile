import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
export declare class HeroSectionController {
    private readonly heroSectionService;
    constructor(heroSectionService: HeroSectionService);
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
    create(createHeroSectionDto: CreateHeroSectionDto): import(".prisma/client").Prisma.Prisma__HeroSectionClient<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        logoUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
