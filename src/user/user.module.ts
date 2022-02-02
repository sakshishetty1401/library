import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn:'6000s'
      }
    }),
    // CacheModule.register({
    //   ttl:60
    // }),
  
  TypeOrmModule.forFeature([User,UserRepository])],
  exports:[JwtStrategy],
  controllers: [UserController],
  providers: [UserService,JwtStrategy,RolesGuard]
})
export class UserModule {}
