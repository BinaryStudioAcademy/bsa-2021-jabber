import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { user as userRepository } from '~/data/repositories/repositories';
import { ENV, HttpCode, ErrorMessage } from '~/common/enums/enums';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT.SECRET,
};

passport.use(new JwtStrategy(options, async ({ userId }, done) => {
  try {
    const user = await userRepository.getById(userId);

    if (user) {
      return done(null, user);
    }

    return done({
      status: HttpCode.UNAUTHORIZED,
      message: ErrorMessage.BAD_TOKEN,
    }, null);
  } catch (err) {
    return done(err);
  }
}));
