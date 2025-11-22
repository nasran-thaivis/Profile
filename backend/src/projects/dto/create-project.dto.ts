// src/projects/dto/create-project.dto.ts

export class CreateProjectDto {
    title: string;
    description?: string; // ใส่ ? แปลว่ามีหรือไม่มีก็ได้
    imageUrl?: string;
    link?: string;
  }