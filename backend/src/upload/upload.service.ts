import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucketName: string;
  private endpoint: string;

  constructor() {
    // ตรวจสอบ environment variables
    const endpoint = process.env.DO_SPACES_ENDPOINT;
    const region = process.env.DO_SPACES_REGION;
    const accessKeyId = process.env.DO_SPACES_KEY;
    const secretAccessKey = process.env.DO_SPACES_SECRET;
    this.bucketName = process.env.DO_SPACES_BUCKET;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey || !this.bucketName) {
      console.warn('⚠️ DigitalOcean Spaces credentials not configured. Upload service may not work.');
    }

    this.endpoint = endpoint;

    // สร้าง S3 Client สำหรับ DigitalOcean Spaces
    this.s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: false, // DigitalOcean Spaces ใช้ virtual-hosted-style
    });
  }

  /**
   * อัปโหลดไฟล์ไปยัง DigitalOcean Spaces
   * @param file - ไฟล์จาก Multer
   * @param folder - โฟลเดอร์ใน bucket (เช่น 'images', 'logos')
   * @returns URL สาธารณะของไฟล์
   */
  async uploadFile(file: any, folder: string = 'uploads'): Promise<string> {
    try {
      // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

      // อัปโหลดไฟล์
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: file.buffer,
          ACL: 'public-read', // ให้เข้าถึงได้แบบ public
          ContentType: file.mimetype,
        }),
      );

      // คืน URL สาธารณะ
      const publicUrl = `${this.endpoint}/${this.bucketName}/${fileName}`;
      return publicUrl;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new InternalServerErrorException('Failed to upload file to storage');
    }
  }

  /**
   * ลบไฟล์จาก DigitalOcean Spaces
   * @param fileUrl - URL ของไฟล์ที่ต้องการลบ
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // แยก fileName จาก URL
      const fileName = fileUrl.split(`${this.bucketName}/`)[1];
      
      if (!fileName) {
        console.warn('Invalid file URL, cannot extract fileName:', fileUrl);
        return;
      }

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );

      console.log(`✅ Deleted file from S3: ${fileName}`);
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      // ไม่ throw error เพราะการลบไฟล์ไม่สำเร็จไม่ควรทำให้ระบบล้มเหลว
    }
  }
}

