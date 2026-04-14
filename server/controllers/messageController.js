import Message from '../models/Message.js';

// @desc    Create a new message from public contact form
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
