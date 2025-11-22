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
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
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
                ContentType: file.mimetype,
            }));
            return fileName;
        }
        catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new common_1.InternalServerErrorException('Failed to upload file to storage');
        }
    }
    getFullUrl(path) {
        if (!path)
            return path;
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return `${this.endpoint}/${this.bucketName}/${path}`;
    }
    extractPath(urlOrPath) {
        if (!urlOrPath)
            return urlOrPath;
        if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
            return urlOrPath;
        }
        try {
            const bucketPattern = `/${this.bucketName}/`;
            const bucketIndex = urlOrPath.indexOf(bucketPattern);
            if (bucketIndex !== -1) {
                return urlOrPath.substring(bucketIndex + bucketPattern.length);
            }
            if (this.endpoint) {
                const endpointIndex = urlOrPath.indexOf(this.endpoint);
                if (endpointIndex !== -1) {
                    const afterEndpoint = urlOrPath.substring(endpointIndex + this.endpoint.length);
                    const path = afterEndpoint.startsWith('/') ? afterEndpoint.substring(1) : afterEndpoint;
                    if (path.startsWith(`${this.bucketName}/`)) {
                        return path.substring(this.bucketName.length + 1);
                    }
                    return path;
                }
            }
            const urlObj = new URL(urlOrPath);
            const pathname = urlObj.pathname;
            const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;
            if (path.startsWith(`${this.bucketName}/`)) {
                return path.substring(this.bucketName.length + 1);
            }
            return path;
        }
        catch (error) {
            console.warn(`Could not extract path from: ${urlOrPath}`, error);
            return urlOrPath;
        }
    }
    async deleteFile(urlOrPath) {
        try {
            const fileName = this.extractPath(urlOrPath);
            if (!fileName) {
                console.warn('Invalid file URL or path, cannot extract fileName:', urlOrPath);
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
    async getSignedUrl(urlOrPath, expiresIn = 3600) {
        try {
            if (!urlOrPath) {
                return urlOrPath;
            }
            const fileName = this.extractPath(urlOrPath);
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
            });
            const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            return signedUrl;
        }
        catch (error) {
            console.error('Error generating signed URL:', error);
            return urlOrPath;
        }
    }
    async getImageStream(urlOrPath) {
        try {
            if (!urlOrPath) {
                throw new Error('URL or path is required');
            }
            const fileName = this.extractPath(urlOrPath);
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
            });
            const response = await this.s3Client.send(command);
            return {
                Body: response.Body,
                ContentType: response.ContentType,
            };
        }
        catch (error) {
            console.error('Error getting image stream:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve image from storage');
        }
    }
    getProxyUrl(urlOrPath) {
        if (!urlOrPath)
            return urlOrPath;
        if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
            const isDigitalOceanSpace = urlOrPath.includes('digitaloceanspaces.com');
            if (!isDigitalOceanSpace) {
                return urlOrPath;
            }
        }
        const encodedPath = encodeURIComponent(urlOrPath);
        return `/api/upload/image?path=${encodedPath}`;
    }
    normalizeImageUrl(urlOrPath) {
        if (!urlOrPath)
            return urlOrPath;
        if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
            if (urlOrPath.startsWith('/api/upload/image')) {
                try {
                    const url = new URL(urlOrPath, 'http://localhost');
                    const pathParam = url.searchParams.get('path');
                    if (pathParam) {
                        return decodeURIComponent(pathParam);
                    }
                }
                catch (error) {
                    console.warn(`Could not parse proxy URL: ${urlOrPath}`, error);
                }
            }
            return urlOrPath;
        }
        try {
            const url = new URL(urlOrPath);
            if (url.pathname === '/api/upload/image') {
                const pathParam = url.searchParams.get('path');
                if (pathParam) {
                    return decodeURIComponent(pathParam);
                }
            }
            return this.extractPath(urlOrPath);
        }
        catch (error) {
            console.warn(`Could not normalize URL: ${urlOrPath}`, error);
            return this.extractPath(urlOrPath);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map