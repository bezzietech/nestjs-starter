import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@clerk/clerk-sdk-node';
import { CurrentUser } from './shared/decorators/user.decorator';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    //
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getHello(@CurrentUser() user: User) {
    return user;
  }

  @Get('public')
  getPublicHello(): string {
    return this.appService.getHello();
  }
}
