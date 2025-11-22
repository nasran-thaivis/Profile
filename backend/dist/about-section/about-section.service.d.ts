import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class AboutSectionService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findOne(): Promise<any>;
    update(createAboutSectionDto: CreateAboutSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
}
