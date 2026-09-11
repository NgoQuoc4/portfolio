import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }

  async findAll() {
    return this.messageModel.find().sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string) {
    const msg = await this.messageModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!msg) {
      throw new NotFoundException('Message not found');
    }
    return msg;
  }

  async remove(id: string) {
    const deleted = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Message not found');
    }
    return { message: 'Message removed' };
  }
}
