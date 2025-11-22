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
exports.AboutSectionController = void 0;
const common_1 = require("@nestjs/common");
const about_section_service_1 = require("./about-section.service");
const create_about_section_dto_1 = require("./dto/create-about-section.dto");
let AboutSectionController = class AboutSectionController {
    constructor(aboutSectionService) {
        this.aboutSectionService = aboutSectionService;
    }
    findOne() {
        return this.aboutSectionService.findOne();
    }
    update(createAboutSectionDto) {
        return this.aboutSectionService.update(createAboutSectionDto);
    }
    create(createAboutSectionDto) {
        return this.aboutSectionService.update(createAboutSectionDto);
    }
};
exports.AboutSectionController = AboutSectionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AboutSectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_about_section_dto_1.CreateAboutSectionDto]),
    __metadata("design:returntype", void 0)
], AboutSectionController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_about_section_dto_1.CreateAboutSectionDto]),
    __metadata("design:returntype", void 0)
], AboutSectionController.prototype, "create", null);
exports.AboutSectionController = AboutSectionController = __decorate([
    (0, common_1.Controller)('about-section'),
    __metadata("design:paramtypes", [about_section_service_1.AboutSectionService])
], AboutSectionController);
//# sourceMappingURL=about-section.controller.js.map