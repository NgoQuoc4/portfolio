import nodemailer from 'nodemailer';

/**
 * Send an email notification
 * @param {Object} options - Email options
 * @param {string} options.email - Sender's email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email body/message
 * @param {string} options.name - Sender's name
 */
const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"DevFolio System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: `New Message from ${options.name} - DevFolio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e5ec; border-radius: 10px; background-color: #f8fafc;">
        <h2 style="color: #6c63ff; border-bottom: 2px solid #6c63ff; padding-bottom: 10px;">New Contact Message</h2>
        
        <div style="margin-top: 20px;">
          <p><strong>From:</strong> ${options.name} (${options.email})</p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #6c63ff; margin-top: 10px; color: #3d4852; line-height: 1.6;">
            ${options.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <footer style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
          <p>This message was sent from your Portfolio Contact Form.</p>
        </footer>
      </div>
    `,
  };

  // 3. Actually send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${process.env.EMAIL_RECEIVER}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // We don't throw error here to prevent the main request from failing 
    // if only the email notification fails
  }
};

export default sendEmail;
