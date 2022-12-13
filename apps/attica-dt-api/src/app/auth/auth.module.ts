import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      // .env or what is appropriate here
      secret: 'lalalalalalalalalalalalalalal',
      // secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtAuthGuard,
    GoogleOauthGuard,
  ],
  controllers: [UserController, AuthController],
})
export class AuthModule {}
