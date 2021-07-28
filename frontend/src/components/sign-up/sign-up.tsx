import { useForm } from 'react-hook-form';
import { UserCreatePayload } from 'common/types/types';
import {
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { SignupSchema } from 'validation-schemas/validation-schemas';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { Button, Input } from 'components/common/common';
import { getResolver } from 'helpers/form/form';
import styles from './styles.module.scss';

const resolver = getResolver<UserCreatePayload>(SignupSchema);

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreatePayload>({ resolver });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isFormDisable} className={styles.fieldset}>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.FIRST_NAME}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.FIRST_NAME]}
            </span>
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.LAST_NAME}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.LAST_NAME]}
            </span>
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.NICKNAME}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.NICKNAME]}
            </span>
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.EMAIL}
              type={InputType.EMAIL}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.EMAIL]}
            </span>
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.PASSWORD}
              type={InputType.PASSWORD}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.PASSWORD]}
            </span>
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.BIRTHDATE}
              type={InputType.DATE}
              register={register}
              isRequire
            />
            <span className={styles.errorWrapper}>
              {errors[UserCreatePayloadKey.BIRTHDATE]}
            </span>
          </div>
          <Button label="Sign Up" type={ButtonType.SUBMIT} />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
