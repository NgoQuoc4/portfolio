import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Khởi tạo biến môi trường
dotenv.config();

// Khởi tạo app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Cấu hình các route cơ bản
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Mounted routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

// Khởi động server (sẽ gọi connectDB trước khi listen)
// Lưu ý: Vercel sẽ tự handle việc gọi app, không cần listen trong môi trường serverless
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to DB and start server', error);
    }
  };
  startServer();
}

// Luôn gọi connectDB cho môi trường serverless (Vercel)
// Vercel sẽ cache kết nối DB giữa các lần gọi hàm
if (process.env.VERCEL === '1') {
  connectDB();
}

export default app;
