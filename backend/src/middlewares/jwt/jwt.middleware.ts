import passport from 'passport';
import { StrategyName } from '~/common/enums/enums';

const jwt = passport.authenticate(StrategyName.JWT, { session: false });

export { jwt };
