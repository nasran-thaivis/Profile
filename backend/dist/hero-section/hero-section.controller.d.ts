import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
export declare class HeroSectionController {
    private readonly heroSectionService;
    constructor(heroSectionService: HeroSectionService);
    findOne(): Promise<any>;
    update(updateHeroSectionDto: UpdateHeroSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        logoUrl: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
    create(createHeroSectionDto: CreateHeroSectionDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        logoUrl: string | null;
        imageUrl: string | null;
        updatedAt: Date;
    }>;
}
