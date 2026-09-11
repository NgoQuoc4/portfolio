import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findAll() {
    return this.projectModel.find().sort({ sort_order: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updated = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Project not found');
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Project not found');
    }
    return { message: 'Project deleted successfully' };
  }
}
