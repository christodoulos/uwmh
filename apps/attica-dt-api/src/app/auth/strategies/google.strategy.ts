import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

const configService = {
  google: {
    client_id:
      '365538312511-d4f1d4n10e7fc03g1jtknou1q4c2t98s.apps.googleusercontent.com',
    project_id: 'atticadt-oauth2',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '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',
    redirect_uris: [
      'http://localhost:4200/api/auth/google/callback',
      'https://atticadt.uwmh.eu/api/auth/google/callback',
    ],
    javascript_origins: ['http://localhost:4200', 'https://atticadt.uwmh.eu'],
  },
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: configService.google.client_id,
      clientSecret: configService.google.client_secret,
      callbackURL: configService.google.redirect_uris[0],
      // passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    console.log(profile);
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
