import { Response } from 'express';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        message: string;
    }>;
    getSignedUrl(url: string): Promise<{
        signedUrl: string;
    }>;
    getImage(path: string, url: string, res: Response): Promise<any>;
    private streamToBuffer;
}
