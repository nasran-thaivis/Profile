import { AboutSectionService } from './about-section.service';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
export declare class AboutSectionController {
    private readonly aboutSectionService;
    constructor(aboutSectionService: AboutSectionService);
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
    create(createAboutSectionDto: CreateAboutSectionDto): import(".prisma/client").Prisma.Prisma__AboutSectionClient<{
        id: number;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
