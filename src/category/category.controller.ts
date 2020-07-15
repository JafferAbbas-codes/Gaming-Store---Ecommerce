import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async addCategory(@Body('name') categoryName: string) {
    return await this.categoryService.insertCategory(categoryName);
  }

  @Get()
  async getAllCategories() {
    return await this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') categoryId: string) {
    const category = await this.categoryService.getSingleCategory(categoryId);
    return category;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') categoryId: string,
    @Body('name') categoryName: string,
  ) {
    console.log('in controller update category');
    const category = await this.categoryService.updateCategory(
      categoryId,
      categoryName,
    );
    return category;
  }

  @Delete(':id')
  async removeCategory(@Param('id') categoryId: string) {
    console.log('in controller update category');
    await this.categoryService.deleteCategory(categoryId);
    return 'Deleted Successfully!';
  }
}
