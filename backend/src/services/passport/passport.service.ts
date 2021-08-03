import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJwt from 'passport-jwt';
import { user as userRepository } from '~/data/repositories/repositories';
import { HttpCode, ErrorMessage, StrategyName } from '~/common/enums/enums';
import { checkIsCryptsEqual } from '~/helpers/helpers';

type Constructor = {
  secret: string;
  passportJwt: typeof passportJwt;
  LocalStrategy: typeof LocalStrategy;
  userRepository: typeof userRepository;
};

class Passport {
  #options: passportJwt.StrategyOptions;
  #JwtStrategy;
  #LocalStrategy;
  #userRepository;

  constructor({
    secret,
    passportJwt,
    LocalStrategy,
    userRepository,
  }: Constructor) {
    this.#options = {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    };
    this.#JwtStrategy = passportJwt.Strategy;
    this.#LocalStrategy = LocalStrategy;
    this.#userRepository = userRepository;
  }

  private getLoginStrategy(): passportJwt.Strategy {
    return (
      StrategyName.LOGIN,
      new this.#LocalStrategy({
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          const user = await this.#userRepository.getByEmail(email);
          if (!user) {
            return done({
              status: HttpCode.UNAUTHORIZED,
              messages: [ErrorMessage.USER_NOT_FOUND],
            },
            false,
            );
          }

          return (await checkIsCryptsEqual(user.password, password))
            ? done(null, user)
            : done({
              status: HttpCode.UNAUTHORIZED,
              messages: [ErrorMessage.WRONG_PASSWORD],
            },
            false,
            );
        } catch (err) {
          return done(err);
        }
      },
      )
    );
  }

  private getRegisterStrategy(): passportJwt.Strategy {
    return (
      StrategyName.REGISTER,
      new this.#LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
      },
      async ({ body }, _username, _password, done) => {
        try {
          const user = await userRepository.getByEmail(body.email);
          if (user) {
            return done({
              status: HttpCode.UNAUTHORIZED,
              message: ErrorMessage.EMAIL_IS_ALREADY_TAKEN,
            }, null);
          }
          return done(null, { body });
        } catch (err) {
          return done(err);
        }
      },
      )
    );
  }

  private getJwtStrategy(): passportJwt.Strategy {
    return (
      new this.#JwtStrategy(this.#options,
        async ({ userId }, done) => {
          try {
            const user = await this.#userRepository.getById(userId);

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
        })
    );
  }

  private getAllStrategy(): passportJwt.Strategy[] {
    return [
      this.getLoginStrategy(),
      this.getRegisterStrategy(),
      this.getJwtStrategy(),
    ];
  }

  public init(passport: PassportStatic): void {
    this.getAllStrategy().forEach((strategy) => passport.use(strategy));
  }
}

export { Passport };
