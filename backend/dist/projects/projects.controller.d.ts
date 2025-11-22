import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
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
