import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // TODO: should return user in success
    if (request.headers['x-api-key']) {
      await this.handleApiKeyAuth(request);
    } else if (request.headers['authorization']) {
      await this.handleJwtAuth(request);
    } else {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apiKey = request.headers['x-api-key'];
    return String(apiKey);
  }

  private async handleApiKeyAuth(request: Request) {
    const apiKey = this.extractApiKeyFromHeader(request);
    if (!apiKey) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.usersService.findOneWithApiKey(apiKey);
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async handleJwtAuth(request: Request) {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
