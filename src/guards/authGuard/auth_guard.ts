import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { User } from "src/resource/entyties/user_entyties";
import { Repository } from "typeorm";


export class AuthGuard implements CanActivate{
    constructor(
        @InjectRepository(User)
        private readonly userRopsitory:Repository<User>,
        private readonly  jwtservice:JwtService
    ) {}


    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest()

        const {header} = request
        const {authorization} = header

        if(!authorization){
            throw new UnauthorizedException("user are not authorizaten")
        }

        const [token] = (authorization as string).split(" ").reverse()
        try{
            this.jwtservice.verify(token,{secret:process.env.JWT_SECRET})

            const user = this.jwtservice.decode(token)
            request.user = user
        }catch{
            throw new UnauthorizedException("User are not authorization")
        }
        return true
    }
}