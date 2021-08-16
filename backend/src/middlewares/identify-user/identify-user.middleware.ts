import { RequestHandler } from 'express';
import passport from 'passport';
import { StrategyName } from '~/common/enums/enums';

const identifyUser: RequestHandler = (req, res, next) => {
  passport.authenticate(StrategyName.JWT, (err, user) => {
    if (err) {
      next(err);
    }
    if (user) {
      req.user = user;
    }
    return next();
  })(req, res, next);
};

export { identifyUser };
