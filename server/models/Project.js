import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false, // Make it optional in case user doesn't have an image initially
    },
    tech_stack: {
      type: [String], // Array of strings e.g. ["React", "Node.js"]
      required: true,
    },
    github_link: {
      type: String,
      required: false,
    },
    live_demo: {
      type: String,
      required: false,
    },
    sort_order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
