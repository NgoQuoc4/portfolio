import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

export interface UploadedMulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class UploadService {
  async uploadImage(file: UploadedMulterFile): Promise<{ url: string; public_id: string; format: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const folder = process.env.CLOUDINARY_FOLDER || 'ngoquoc_portfolio';

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            return reject(new BadRequestException(error.message || 'Upload to Cloudinary failed'));
          }
          if (!result) {
            return reject(new BadRequestException('Upload result is undefined'));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
          });
        },
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  }
}
