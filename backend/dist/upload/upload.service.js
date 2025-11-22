"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    constructor() {
        const endpoint = process.env.DO_SPACES_ENDPOINT;
        const region = process.env.DO_SPACES_REGION;
        const accessKeyId = process.env.DO_SPACES_KEY;
        const secretAccessKey = process.env.DO_SPACES_SECRET;
        this.bucketName = process.env.DO_SPACES_BUCKET;
        if (!endpoint || !region || !accessKeyId || !secretAccessKey || !this.bucketName) {
            console.warn('⚠️ DigitalOcean Spaces credentials not configured. Upload service may not work.');
        }
        this.endpoint = endpoint;
        this.s3Client = new client_s3_1.S3Client({
            endpoint,
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: false,
        });
    }
    async uploadFile(file, folder = 'uploads') {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${folder}/${(0, uuid_1.v4)()}.${fileExtension}`;
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: file.mimetype,
            }));
            const publicUrl = `${this.endpoint}/${this.bucketName}/${fileName}`;
            return publicUrl;
        }
        catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new common_1.InternalServerErrorException('Failed to upload file to storage');
        }
    }
    async deleteFile(fileUrl) {
        try {
            const fileName = fileUrl.split(`${this.bucketName}/`)[1];
            if (!fileName) {
                console.warn('Invalid file URL, cannot extract fileName:', fileUrl);
                return;
            }
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
            }));
            console.log(`✅ Deleted file from S3: ${fileName}`);
        }
        catch (error) {
            console.error('Error deleting file from S3:', error);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map