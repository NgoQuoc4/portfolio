import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(updateProfileDto);
  }
}
