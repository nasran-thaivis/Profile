import {
  Controller, //ตัวจัดการการข้อมูล สำหรับหน้า Contact Us (Controller)
  Get, //HTTP Methods
  Post, //HTTP Methods 
  Put, //HTTP Methods 
  Delete, //HTTP Methods 
  Body, //ตัวดึงข้อมูล (จาก Body หรือ URL)
  Param, //ตัวดึงข้อมูล (จาก Param)
  HttpCode, // การจัดการ Status Code (200, 201, 404)
  HttpStatus, // การจัดการ Status Code (200, 201, 404)
  BadRequestException,
  NotFoundException,
  HttpException, // การจัดการ Error
} from '@nestjs/common'; 
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactStatusDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContactDto: CreateContactDto) {
    if (!createContactDto.name || !createContactDto.email || !createContactDto.message) {
      throw new BadRequestException('Missing required fields');
    }
    return this.contactService.create(createContactDto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateContactStatusDto,
  ) {
    
    return this.contactService.updateStatus(id, updateStatusDto);
    
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) { 
    return this.contactService.remove(id); 
  }
}

