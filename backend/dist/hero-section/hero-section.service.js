"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HeroSectionService = class HeroSectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne() {
        const hero = await this.prisma.heroSection.findUnique({
            where: { id: 1 },
        });
        if (!hero) {
            return this.prisma.heroSection.create({
                data: {
                    id: 1,
                    title: 'Welcome',
                    description: 'This is my portfolio',
                    imageUrl: 'https://placehold.co/1920x1080',
                },
            });
        }
        return hero;
    }
    update(updateHeroSectionDto) {
        return this.prisma.heroSection.upsert({
            where: { id: 1 },
            update: updateHeroSectionDto,
            create: {
                id: 1,
                title: 'Welcome',
                description: 'This is my portfolio',
                ...updateHeroSectionDto,
            },
        });
    }
};
exports.HeroSectionService = HeroSectionService;
exports.HeroSectionService = HeroSectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HeroSectionService);
//# sourceMappingURL=hero-section.service.js.map