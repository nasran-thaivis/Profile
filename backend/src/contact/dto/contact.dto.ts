export class CreateContactDto {
  name: string;  //ชื่อผู้ใช้งาน
  email: string;  //อีเมลผู้ใช้งาน
  message: string;  //ข้อความที่กรอกมา
  status?: string;  //สถานะการข้อมูล อัตโนมัติ
}

export class UpdateContactStatusDto {
  status: string; // 'new' | 'read' | 'replied' //สถานะการข้อมูล
}

