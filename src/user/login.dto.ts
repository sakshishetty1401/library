import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Login dto class
 */
export class LoginDTO {

    /**
     * @type:string
     * Accepts the string value
     */
    @IsNotEmpty({ message: 'EmailId is required' })
    @IsEmail({message : 'Enter valid email id'})
    emailId: string;
    
    /**
     * @type:string
     * Accepts the string value
     */
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}