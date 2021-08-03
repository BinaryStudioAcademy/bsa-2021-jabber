import passport from 'passport';
import { StrategyName } from '~/common/enums/enums';

const registration = passport.authenticate(StrategyName.REGISTER, { session: false });

export { registration };
