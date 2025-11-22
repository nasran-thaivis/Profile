import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class HeroSectionService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findOne(): Promise<any>;
    update(updateHeroSectionDto: UpdateHeroSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        logoUrl: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
}
