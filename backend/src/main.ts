import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express'; // <--- 1. Import ตัวนี้เพิ่มมา

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // === 2. เพิ่มส่วนนี้เพื่อรองรับการส่งรูปภาพขนาดใหญ่ (แก้ Error 413 Payload Too Large) ===
  // กำหนดไว้ 10mb เพื่อให้รองรับ Base64 string ยาวๆ ได้สบาย
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  // ==========================================================================
  
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Global prefix (URL จะเป็น localhost:3005/api/...)
  app.setGlobalPrefix('api');
  
  // 👇 แก้ตรงนี้เป็น 3005 ตามที่ขอ
  const port = process.env.PORT || 3005; 
  
  await app.listen(port);
  console.log(`🚀 Backend is running on: http://localhost:${port}/api`);
}

bootstrap();