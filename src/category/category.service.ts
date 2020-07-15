import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
      ) {}
    
      async insertCategory(name: string) {
        
        console.log("in service post category")
        const newCategory = new this.categoryModel({
          name
        });
        const result = await newCategory
          .save()
        console.log(result);
        return result;
      }
    
      async getCategories() {
        const categories = await this.categoryModel.find().exec();
        console.log(categories);
        return categories.map(category => ({
          id: category._id,
          name : category.name
        }));
      }
    
      async getSingleCategory(categoryId: string) {
        const category = await this.findCategory(categoryId);
        return {
            id: category._id,
            name: category.name
      }
    }
    
      async updateCategory(
        categoryId: string,
        name: string
      ) {
        const updatedCategory = await this.findCategory(categoryId);
        if (name) {
          updatedCategory.name = name;
        }
        await updatedCategory.save();
        return updatedCategory;
      }
    
        async deleteCategory(categoryId: string){
          await this.categoryModel.deleteOne({_id:categoryId}).exec();
        }
    
      async findCategory(id: string): Promise<Category> {
        let category;
        try {
          category = await this.categoryModel.findById(id).exec();
        } catch {
          throw new NotFoundException('Could not find category');
        }
        if (!category) {
          throw new NotFoundException('Could not find category');
        }
        return category;
      }

}
