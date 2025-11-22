"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const hero_section_controller_1 = require("./hero-section.controller");
const hero_section_service_1 = require("./hero-section.service");
describe('HeroSectionController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [hero_section_controller_1.HeroSectionController],
            providers: [hero_section_service_1.HeroSectionService],
        }).compile();
        controller = module.get(hero_section_controller_1.HeroSectionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=hero-section.controller.spec.js.map