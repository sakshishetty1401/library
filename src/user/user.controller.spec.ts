import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { UserController } from './user.controller';
import { UserDTO } from './user.dto';
import { User } from './user.entity';


/**
 * user
 */
const users = {

  userName: "surya",
  emailId: "surya@hcl.com",
  password: "surya",
  phoneNumber: 123456789,
  panCard: "LTUPS9989JS",
  bankAccount: 20299100200
}

/**
 * importing userDTO
 */
const userImportDTO = plainToInstance(UserDTO, User)

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, {
        provide: UserService,
        useFactory: () => ({
          registerUser: jest.fn(),
          login: jest.fn(),
          myPurchase: jest.fn()
        })
      }]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('When registerUser()', () => {
    it('should return response', async () => {
        let findOneSpy = jest.spyOn(userService, 'registerUser').mockResolvedValue('register succesful');
        let response = await userController.registerUser(userImportDTO);
        expect(response).toEqual('register succesful');
        expect(findOneSpy).toHaveBeenCalled()
    })
})

  describe('When loginUser', () => {
    it('should return respone', async () => {
      const token = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic3VyeWFAaGNsLmNvbSIsImlhdCI6MTY0MzYzMzQzNSwiZXhwIjoxNjQzNjMzNTU1fQ.cYejQxcYuUCPERvPzoGcB7ygyw8Mdrdz9l6uLHySZ_o" }
      const login = {
        emailId: "sakshi@hcl.com",
        password: "sakshi"
      }
      let loginSpy = jest.spyOn(userService, 'loginUser').mockResolvedValue(token);
      let response = await userController.loginUser(login);
      expect(response).toEqual(token);
      expect(loginSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalledTimes(1);
    })
  })

  describe('When Get myPurchase()', () => {
    it('should return response', async () => {
      let getHotelByPlaceSpy = jest.spyOn(userService, 'myPurchase').mockResolvedValue(userImportDTO)
      let response = await userController.myPurchase(1);
      expect(response).toEqual(userImportDTO)
      expect(getHotelByPlaceSpy).toHaveBeenCalled()
      expect(getHotelByPlaceSpy).toHaveBeenCalledTimes(1)
    })
  })

});


