"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const about_section_service_1 = require("./about-section.service");
describe('AboutSectionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [about_section_service_1.AboutSectionService],
        }).compile();
        service = module.get(about_section_service_1.AboutSectionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=about-section.service.spec.js.map