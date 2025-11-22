"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const about_section_controller_1 = require("./about-section.controller");
const about_section_service_1 = require("./about-section.service");
describe('AboutSectionController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [about_section_controller_1.AboutSectionController],
            providers: [about_section_service_1.AboutSectionService],
        }).compile();
        controller = module.get(about_section_controller_1.AboutSectionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=about-section.controller.spec.js.map