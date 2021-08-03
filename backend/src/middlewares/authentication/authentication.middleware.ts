import passport from 'passport';
import { StrategyName } from '~/common/enums/enums';

const authentication = passport.authenticate(StrategyName.LOGIN, { session: false });

export { authentication };
