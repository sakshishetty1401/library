import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../user.repository";
import { JwtPayload } from "./jwt-payload.interface";

/**
 * For Jwtstartegy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     * Dependency Injection
     * @param userRepository 
     */
    constructor(private userRepository: UserRepository) {
    super({
            secretOrKey:process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
        console.log(process.env.JWT_SECRET)

    }
    
    /**
     * Validate the Jwtpayload
     * @param payload 
     * @returns 
     */
    async validate(payload: JwtPayload) {
        try {
            let response = this.userRepository.findOneOrFail({ emailId: payload.emailId });
            console.log(response)
            return response;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)

        }
    }
}