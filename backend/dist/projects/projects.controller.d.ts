import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateProjectDto: UpdateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        title: string;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
