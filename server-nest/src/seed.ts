import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './auth/schemas/user.schema';
import { Model } from 'mongoose';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

  const existing = await userModel.findOne({ username: 'admin' });
  if (!existing) {
    const user = new userModel({
      username: 'admin',
      password: 'password123',
    });
    await user.save();
    console.log('✅ Created default admin: admin / password123');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  await app.close();
}

seed();
