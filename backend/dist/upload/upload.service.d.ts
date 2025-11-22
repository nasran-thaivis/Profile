export declare class UploadService {
    private s3Client;
    private bucketName;
    private endpoint;
    constructor();
    uploadFile(file: any, folder?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
