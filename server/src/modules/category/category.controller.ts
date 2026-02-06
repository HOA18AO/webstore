import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create a category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Get one category by id' })
  @ApiResponse({ status: 200, description: 'Category' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Updated category' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
