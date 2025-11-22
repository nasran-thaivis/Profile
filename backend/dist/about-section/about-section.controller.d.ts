import { AboutSectionService } from './about-section.service';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
export declare class AboutSectionController {
    private readonly aboutSectionService;
    constructor(aboutSectionService: AboutSectionService);
    findOne(): Promise<any>;
    update(createAboutSectionDto: CreateAboutSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
    create(createAboutSectionDto: CreateAboutSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
}
