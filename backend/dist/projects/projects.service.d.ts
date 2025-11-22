import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ProjectsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        link: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
