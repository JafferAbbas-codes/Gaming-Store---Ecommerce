import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import {editFileName,imageFileFilter} from '../utils/file-upload.util'
import { diskStorage } from 'multer'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // options = MulterModule.register({
  //   dest: '/upload',
  // });

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addProduct(
    @UploadedFiles() files,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('category') prodCat: string,
    @Body('price') prodPrice: number,
  ) {
    // let response = []
    // files.forEach(file => {
      // const fileReponse = {
      //   originalname: file.originalname,
      //   filename: file.filename,
      // };
      // response.push(fileReponse);
    // });
    // console.log(response);
    // return response;
    
    // console.log("file : " , files[0]);
    // console.log('in add prodcut controller');
    return await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodCat,
      files[0].filename,
      prodPrice,
    );
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    console.log(products);
    return products;
  }

  @Get('/category/:id')
  async getProductsByCategory(@Param('id') categoryId: string) {
    //console.log(categoryId + " 1");
    const products = await this.productsService.getProductsByCategory(
      categoryId,
    );
    //console.log(products)
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.getSingleProduct(prodId);
    return product;
  }

  @Patch(':id') //done
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('category') prodCat: string,
    @Body('price') prodPrice: number,
  ) {
    console.log('in controller post product');
    const product = await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodCat,
      prodPrice,
    );
    return product;
  }

  @Delete(':id') //done
  async removeProduct(@Param('id') prodId: string): Promise<any> {
    await this.productsService.deleteProduct(prodId);
    return 'Deleted Successfully!';
  }
}
