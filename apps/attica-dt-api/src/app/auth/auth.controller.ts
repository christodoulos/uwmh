import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthPayload, GoogleButtonData, UserDTO } from '@uwmh/data';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google-login')
  login(@Body() body: GoogleButtonData, @Res() res: Response) {
    const client = new OAuth2Client();
    let payload: GoogleAuthPayload;
    const verify = async () => {
      const ticket = await client.verifyIdToken({
        idToken: body.credential,
        audience:
          '365538312511-d4f1d4n10e7fc03g1jtknou1q4c2t98s.apps.googleusercontent.com',
      });
      payload = ticket.getPayload();
    };
    verify()
      .then(async () => {
        const { name, given_name, family_name, email, picture, sub } = payload;
        const user = { name, given_name, family_name, email, picture };
        const provider = { provider: 'google', providerId: sub };
        const token = await this.authService.signIn({ ...provider, ...user });
        res.redirect('/?token=' + token);
      })
      .catch(console.error);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>', req.user);
    const token = await this.authService.signIn(req.user);
    console.log(token);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    console.log('TOKEN SET');
    // return res.status(HttpStatus.OK);
    // return { token };
    // return res.redirect('/');
    res.send({ token });
    // res.redirect('http://localhost:4200/' + token);
  }

  @Post('user')
  find_user_by_email(@Body() body: { email: string }): Promise<UserDTO | null> {
    return this.authService.findUserByEmail(body.email);
  }

  @Post('user/signup')
  sign_up_user(@Body() body: { user: UserDTO }): Promise<string> {
    return this.authService.registerUser(body.user);
  }
}
