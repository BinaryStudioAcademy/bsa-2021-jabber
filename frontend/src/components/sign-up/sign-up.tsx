import { useForm, FieldValues } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import logo from 'assets/img/logo-dark.svg';
import { UserCreatePayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { SignupSchema } from 'validation-schemas/validation-schemas';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    resolver: joiResolver(SignupSchema),
    mode: 'onSubmit',
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const dispatch = useDispatch();

  const isFormDisable = authStatus === DataStatus.PENDING;

  const onSubmit = (data: UserCreatePayload): void => {
    dispatch(authActions.signUp(data));
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img
          src={logo}
          className={styles.formLogo}
          loading="lazy"
          alt="Jabber logo"
        />
        <h3 className={styles.formTitle}>Sign Up</h3>
        <div className={styles.formSubtitle}>
          Already have an account?
          <Link to={AppRoute.SIGN_IN}>Sign In</Link>
        </div>
        <fieldset disabled={isFormDisable} className={styles.fieldset}>
          <Input
            label={UserCreatePayloadKey.FIRST_NAME}
            name={UserCreatePayloadKey.FIRST_NAME}
            control={control}
            errors={errors}
          />
          <Input
            label={UserCreatePayloadKey.LAST_NAME}
            name={UserCreatePayloadKey.LAST_NAME}
            control={control}
            errors={errors}
          />
          <Input
            label={UserCreatePayloadKey.NICKNAME}
            name={UserCreatePayloadKey.NICKNAME}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.EMAIL}
            label={UserCreatePayloadKey.EMAIL}
            name={UserCreatePayloadKey.EMAIL}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.PASSWORD}
            label={UserCreatePayloadKey.PASSWORD}
            name={UserCreatePayloadKey.PASSWORD}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.DATE}
            label={UserCreatePayloadKey.BIRTHDATE}
            name={UserCreatePayloadKey.BIRTHDATE}
            control={control}
            errors={errors}
          />
          <Button label="Sign Up" type={ButtonType.SUBMIT} />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
