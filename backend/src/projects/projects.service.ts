// src/projects/projects.service.ts

import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service'; // 👈 ต้อง Import PrismaService

@Injectable()
export class ProjectsService {
  // 1. ฉีด Prisma เข้ามาใช้งาน
  constructor(private prisma: PrismaService) {}

  // 2. ฟังก์ชันสร้างโปรเจกต์ใหม่ (POST)
  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  // 3. ฟังก์ชันดึงข้อมูลทั้งหมด (GET)
  findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' }, // เรียงจากใหม่ไปเก่า
    });
  }

  // 4. ฟังก์ชันดึงข้อมูลอันเดียว (GET :id)
  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  // 5. ฟังก์ชันแก้ไข (PATCH)
  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  // 6. ฟังก์ชันลบ (DELETE)
  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}