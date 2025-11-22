export declare class UploadService {
    private s3Client;
    private bucketName;
    private endpoint;
    constructor();
    uploadFile(file: any, folder?: string): Promise<string>;
    getFullUrl(path: string): string;
    private extractPath;
    deleteFile(urlOrPath: string): Promise<void>;
    getSignedUrl(urlOrPath: string, expiresIn?: number): Promise<string>;
    getImageStream(urlOrPath: string): Promise<{
        Body: any;
        ContentType?: string;
    }>;
    getProxyUrl(urlOrPath: string): string;
    normalizeImageUrl(urlOrPath: string): string;
}
