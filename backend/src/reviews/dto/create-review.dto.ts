export class CreateReviewDto {
    name: string;
    rating: number;   // รับเป็นตัวเลข 1-5
    comment: string;
    avatarUrl?: string; // ลิงก์รูปโปรไฟล์ (ใส่หรือไม่ใส่ก็ได้)
  }