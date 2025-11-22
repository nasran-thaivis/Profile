"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAboutSectionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_about_section_dto_1 = require("./create-about-section.dto");
class UpdateAboutSectionDto extends (0, mapped_types_1.PartialType)(create_about_section_dto_1.CreateAboutSectionDto) {
}
exports.UpdateAboutSectionDto = UpdateAboutSectionDto;
//# sourceMappingURL=update-about-section.dto.js.map