import { Body, CacheInterceptor, Controller, Get, HttpStatus, Logger, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBasicAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CONFLICT_EXCEPTION, FAILED_FETCH_USER, FAILED_TO_FETCH, FETCH_ID_SUCCESS, NOT_FOUND, USER_ID_NOTFOUND, USER_LOGIN, USER_REGISTERED } from '../../constant';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { LoginDTO } from './login.dto';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

/**
 * User Controller includes handler fro CRUD operation
 * @author : sakshi shetty
 */
 @ApiBasicAuth('swagger-auth')
 @ApiTags('User')
 @Controller('user')
 export class UserController {
     /**
     * Logger Instance
     */
      logger = new Logger(UserController.name)
    

      /**
       * Deoendency Injection
       * @param usersService 
       */
      constructor(private userService: UserService) { }
  
      /**
      * Register for user
      * @param registerDto 
      * @returns success or failure message
      */
      @ApiOkResponse({ description: USER_REGISTERED , status: HttpStatus.OK })
      @ApiNotFoundResponse({ description: NOT_FOUND, status: HttpStatus.NOT_FOUND })
      @ApiInternalServerErrorResponse({ description: FAILED_TO_FETCH , status: HttpStatus.INTERNAL_SERVER_ERROR })
      @ApiConflictResponse({ description: CONFLICT_EXCEPTION, status: HttpStatus.CONFLICT })
      @Post()
      registerUser(@Body() registerDto: UserDTO): Promise<String> {
          return this.userService.registerUser(registerDto)
      }
  
  
      /**
       * Login for user
       * @param userLogin 
       * @returns 
       */
      @ApiOkResponse({ description: USER_LOGIN, status: HttpStatus.OK })
      @ApiNotFoundResponse({ description: NOT_FOUND, status: HttpStatus.NOT_FOUND })
      @ApiInternalServerErrorResponse({ description: FAILED_TO_FETCH , status: HttpStatus.INTERNAL_SERVER_ERROR })
      @Post('/login')
      loginUser(@Body() userLogin: LoginDTO): Promise<{ token }> {
          return this.userService.loginUser(userLogin);
  
      }


     /**
     * Fetch the details of user and books
     * @param id 
     * @returns 
     */
     @ApiOkResponse({ description: FETCH_ID_SUCCESS, status: HttpStatus.OK })
     @ApiNotFoundResponse({ description: USER_ID_NOTFOUND, status: HttpStatus.NOT_FOUND })
     @ApiInternalServerErrorResponse({ description: FAILED_FETCH_USER, status: HttpStatus.INTERNAL_SERVER_ERROR })
     @UseGuards(RolesGuard, JwtAuthGuard)
     //@UseInterceptors(CacheInterceptor)
     @Get(':id/purchase')
     myPurchase(@Param('id',ParseIntPipe) id: number): Promise<UserDTO> {
         return this.userService.myPurchase(id);
     }

}
