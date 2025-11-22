import { PartialType } from '@nestjs/mapped-types'; //ตัวช่วยสร้าง DTO จาก CreateAboutSectionDto
import { CreateAboutSectionDto } from './create-about-section.dto'; //ตัวสร้าง DTO หน้า About

export class UpdateAboutSectionDto extends PartialType(CreateAboutSectionDto) {} //ตัวสร้าง DTO หน้า About
