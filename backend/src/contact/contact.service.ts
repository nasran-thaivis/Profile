import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto, UpdateContactStatusDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {} 

  async findAll() {
    return this.prisma.contactRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.contactRequest.findUnique({
      where: { id },
    });
  }

  async create(createContactDto: CreateContactDto) {
    return this.prisma.contactRequest.create({
      data: createContactDto,
    });
  }

  async updateStatus(id: string, updateStatusDto: UpdateContactStatusDto) {
    try {
      return await this.prisma.contactRequest.update({
        where: { id },
        data: { status: updateStatusDto.status },
      });
    } catch (error) {
      // จับ Prisma error เมื่อไม่พบ record (P2025)
      // if (error.code === 'P2025') {
        // throw new NotFoundException(`Contact request with ID ${id} not found`);
      // }    // จับ error อื่นๆ
      throw new HttpException(
        'Unexpected error during user creation',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async remove(id: string) {
    await this.prisma.contactRequest.delete({
      where: { id },
    });
    return { message: 'Contact request deleted successfully' };
  }
}

