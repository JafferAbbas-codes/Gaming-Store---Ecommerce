import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    categoryId: string,
    imageName: string,
    price: number,
  ): Promise<Product> {
    console.log('in controller post product');
    const category = await this.categoryService.findCategory(categoryId);
    const newProduct = new this.productModel({
      title,
      description: desc,
      category,
      imageName,
      price,
    });
    const result = await newProduct.save();
    console.log(result);
    return result;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    console.log(products);
    return products;
    }; 
  

  async getProductsByCategory(categoryId: string): Promise<any> {
    console.log(categoryId);
    const cat= await this.categoryService.findCategory(categoryId);
    console.log("category : " , cat)
    const products = await this.productModel
      .find({category : cat})
      .populate('category','name')
      .exec();
    console.log( products);
    return products.map(prod => ({
      id: prod._id,
      title: prod.title,
      description: prod.description,
      category: categoryId,
      imageName:prod.imageName,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string): Promise<any> {
    const product = await this.findProduct(productId);
    return {
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    categoryId: string,
    price: number,
  ): Promise<Product> {
    const updatedProduct = await this.findProduct(productId);

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (categoryId) {
      const cat= await this.categoryService.findCategory(categoryId);
      updatedProduct.category = cat;
    }
    if (price) {
      updatedProduct.price = price;
    }
    await updatedProduct.save();
    return updatedProduct;
  }

  async deleteProduct(prodId: string): Promise<any> {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
}
