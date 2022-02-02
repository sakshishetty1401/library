import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * app Controller includes handler fro CRUD operation
 * @author : sakshi shetty
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  /**
   * String get hello
   * @returns 
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
