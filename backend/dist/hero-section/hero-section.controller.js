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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSectionController = void 0;
const common_1 = require("@nestjs/common");
const hero_section_service_1 = require("./hero-section.service");
const create_hero_section_dto_1 = require("./dto/create-hero-section.dto");
const update_hero_section_dto_1 = require("./dto/update-hero-section.dto");
let HeroSectionController = class HeroSectionController {
    constructor(heroSectionService) {
        this.heroSectionService = heroSectionService;
    }
    findOne() {
        return this.heroSectionService.findOne();
    }
    update(updateHeroSectionDto) {
        return this.heroSectionService.update(updateHeroSectionDto);
    }
    create(createHeroSectionDto) {
        return this.heroSectionService.update(createHeroSectionDto);
    }
};
exports.HeroSectionController = HeroSectionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeroSectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_hero_section_dto_1.UpdateHeroSectionDto]),
    __metadata("design:returntype", void 0)
], HeroSectionController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hero_section_dto_1.CreateHeroSectionDto]),
    __metadata("design:returntype", void 0)
], HeroSectionController.prototype, "create", null);
exports.HeroSectionController = HeroSectionController = __decorate([
    (0, common_1.Controller)('hero-section'),
    __metadata("design:paramtypes", [hero_section_service_1.HeroSectionService])
], HeroSectionController);
//# sourceMappingURL=hero-section.controller.js.map