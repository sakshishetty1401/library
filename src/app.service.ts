import { Injectable } from '@nestjs/common';

/**
 * It will insert/update/delete/retrieve app information in the database/repository
 */
@Injectable()
export class AppService {

  /**
   * string value
   * @returns 
   */
  getHello(): string {
    return 'Hello World!';
  }
}
