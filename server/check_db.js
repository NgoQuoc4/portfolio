import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const checkProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({});
    console.log('Total projects in DB:', projects.length);
    projects.forEach(p => console.log(`- ${p.title}`));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkProjects();
