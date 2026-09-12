import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng cung cấp họ và tên của bạn.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ email không đúng định dạng.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập nội dung tin nhắn.' },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'EMAIL_USER chưa được cấu hình trong .env.local.' },
        { status: 503 }
      );
    }

    // 2. Check credentials configuration
    if (!pass) {
      console.warn(
        '⚠️ EMAIL_PASS chưa được thiết lập trong .env.local. Vui lòng tạo Mật khẩu ứng dụng (App Password) trên tài khoản Google và dán vào EMAIL_PASS.'
      );
      return NextResponse.json(
        {
          success: false,
          error:
            'Chưa cấu hình Mật khẩu ứng dụng (EMAIL_PASS) trong file .env.local.',
          hint: 'Vui lòng truy cập https://myaccount.google.com/apppasswords để tạo mật khẩu ứng dụng 16 ký tự.',
        },
        { status: 503 }
      );
    }

    // 3. Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass: pass.replace(/\s+/g, ''),
      },
    });

    const sendTime = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // 4. Escape HTML and prepare email content
    const escHtml = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const sanitizedName = escHtml(name.trim());
    const sanitizedEmail = escHtml(email.trim());
    const sanitizedMessage = escHtml(message.trim());

    // 5. Send notification email to the website owner
    await transporter.sendMail({
      from: `"Portfolio · ${sanitizedName}" <${user}>`,
      to: user,
      replyTo: `"${sanitizedName}" <${sanitizedEmail}>`,
      subject: `📬 Tin nhắn mới từ Portfolio: ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f8; margin: 0; padding: 24px; color: #10141e; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e6ee; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
            .header { background: linear-gradient(135deg, #f472b6, #a855f7); padding: 32px 28px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 28px; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #687288; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 15px; color: #10141e; font-weight: 500; }
            .message-box { background: #f8fafc; border-left: 4px solid #f472b6; padding: 16px; border-radius: 0 12px 12px 0; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #242836; white-space: pre-wrap; }
            .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e6ee; font-size: 12px; color: #8e98ac; text-align: center; }
            .btn { display: inline-block; background: #10141e; color: #ffffff !important; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Tin nhắn liên hệ mới</h1>
              <p>Có người vừa gửi tin nhắn qua website portfolio của bạn</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Người gửi</div>
                <div class="value">${sanitizedName}</div>
              </div>
              <div class="field-group">
                <div class="label">Email liên hệ</div>
                <div class="value"><a href="mailto:${sanitizedEmail}" style="color: #ec4899; text-decoration: none;">${sanitizedEmail}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Thời gian gửi</div>
                <div class="value" style="font-size: 13px; color: #5e687e;">${sendTime} (Giờ Việt Nam)</div>
              </div>
              <div class="field-group">
                <div class="label">Nội dung tin nhắn</div>
                <div class="message-box">${sanitizedMessage}</div>
              </div>
              <div style="text-align: center; padding-top: 12px;">
                <a href="mailto:${sanitizedEmail}?subject=Re: Phản hồi liên hệ từ Ngô Chí Quốc" class="btn">
                  Trả lời ${sanitizedName}
                </a>
              </div>
            </div>
            <div class="footer">
              Email này được gửi tự động từ hệ thống Portfolio của Ngô Chí Quốc.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Tin nhắn đã được gửi thành công!',
    });
  } catch (error: any) {
    console.error('Lỗi khi gửi email:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          'Đã xảy ra lỗi khi gửi email. Vui lòng kiểm tra lại cấu hình tài khoản.',
      },
      { status: 500 }
    );
  }
}
