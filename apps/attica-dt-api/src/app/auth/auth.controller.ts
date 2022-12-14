import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthPayload, UserDTO } from '@uwmh/data';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  find_user_by_email(@Body() body: { email: string }): Promise<UserDTO | null> {
    return this.authService.findUserByEmail(body.email);
  }

  @Post('user/signup')
  async sign_up_user(@Body() body: { token: string; user: UserDTO }) {
    // fix a Google Auth client to verify the token
    const client = new OAuth2Client();
    let payload: GoogleAuthPayload;
    const verify = async () => {
      const ticket = await client.verifyIdToken({
        idToken: body.token,
        audience:
          '365538312511-d4f1d4n10e7fc03g1jtknou1q4c2t98s.apps.googleusercontent.com',
      });
      payload = ticket.getPayload();
      const { name, given_name, family_name, email, picture, sub } = payload;
      const { linkedin } = body.user;
      const provider = { provider: 'google', providerId: sub };
      const user = {
        name,
        given_name,
        family_name,
        email,
        picture,
        linkedin,
        ...provider,
      };
      const jwt = await this.authService.registerUser(user);
      return { jwt };
    };
    // proceed to verification
    return verify().catch(console.error);
  }
}
