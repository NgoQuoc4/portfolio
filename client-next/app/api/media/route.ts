import { NextRequest, NextResponse } from 'next/server';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dguad3xyf';
const apiKey = process.env.CLOUDINARY_API_KEY || '931633996125836';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'hxDOyEQKgXP_7XQb8MCDYW3_BSg';
const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`;

// 1. GET: Lấy danh sách toàn bộ ảnh đã upload trên Cloudinary
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const maxResults = searchParams.get('max_results') || '100';

    const targetFolder = searchParams.get('folder') || process.env.CLOUDINARY_FOLDER || 'ngoquoc_portfolio';
    const prefix = targetFolder ? `${targetFolder}/` : 'ngoquoc_portfolio/';

    // Chỉ đồng bộ và lấy các ảnh nằm trong thư mục ngoquoc_portfolio
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=${encodeURIComponent(prefix)}&max_results=${maxResults}&type=upload`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Không thể lấy danh sách ảnh từ Cloudinary' },
        { status: response.status }
      );
    }

    // Đảm bảo chỉ nhận những file bắt đầu bằng ngoquoc_portfolio/
    const resources = (data.resources || [])
      .filter((r: any) => r.public_id.startsWith(prefix) || r.public_id.startsWith('ngoquoc_portfolio'))
      .map((r: any) => ({
        public_id: r.public_id,
        url: r.secure_url,
        format: r.format,
        width: r.width,
        height: r.height,
        bytes: r.bytes,
        created_at: r.created_at,
      }));

    return NextResponse.json({
      success: true,
      folder: prefix.replace(/\/$/, ''),
      total: resources.length,
      resources,
      next_cursor: data.next_cursor || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Lỗi hệ thống khi tải ảnh Cloudinary' },
      { status: 500 }
    );
  }
}

// 2. DELETE: Xóa ảnh khỏi Cloudinary qua public_id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get('public_id');

    if (!publicId) {
      return NextResponse.json(
        { error: 'public_id là bắt buộc' },
        { status: 400 }
      );
    }

    // Cloudinary Admin API xóa tài nguyên
    const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?public_ids[]=${encodeURIComponent(publicId)}`;

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Xóa ảnh thất bại' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Đã xóa ảnh "${publicId}" thành công khỏi Cloudinary!`,
      result: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Lỗi hệ thống khi xóa ảnh Cloudinary' },
      { status: 500 }
    );
  }
}
