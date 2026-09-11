import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dguad3xyf';
    const apiKey = process.env.CLOUDINARY_API_KEY || '931633996125836';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'hxDOyEQKgXP_7XQb8MCDYW3_BSg';
    const folder = process.env.CLOUDINARY_FOLDER || 'ngoquoc_portfolio';
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Chuẩn bị chuỗi ký chữ ký theo định dạng Cloudinary: key1=val1&key2=val2...secret
    const paramsToSign = [
      `folder=${folder}`,
      `timestamp=${timestamp}`,
    ].sort().join('&');

    const strToSign = `${paramsToSign}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp);
    uploadFormData.append('signature', signature);
    uploadFormData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Upload to Cloudinary failed' },
        { status: response.status },
      );
    }

    return NextResponse.json({
      url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error during upload' },
      { status: 500 },
    );
  }
}
