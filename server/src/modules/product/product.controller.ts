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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Get one product by id' })
  @ApiResponse({ status: 200, description: 'Product' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Updated product' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
