import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello and links' })
  @ApiResponse({ status: 200, description: 'Welcome message' })
  getHello() {
    return {
      message: this.appService.getHello(),
      health: '/health',
      swagger: '/api',
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  getHealth() {
    return { status: 'OK' };
  }
}
