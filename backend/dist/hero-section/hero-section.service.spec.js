"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const hero_section_service_1 = require("./hero-section.service");
describe('HeroSectionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [hero_section_service_1.HeroSectionService],
        }).compile();
        service = module.get(hero_section_service_1.HeroSectionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=hero-section.service.spec.js.map