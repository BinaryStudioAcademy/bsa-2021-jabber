import { useForm  } from 'react-hook-form';
import { SignInPayload } from 'common/types/types';
import {
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { SigninSchema } from 'validation-schemas/validation-schemas';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { getResolver } from 'helpers/form/form';
import styles from './styles.module.scss';

const resolver = getResolver<SignInPayload>(SigninSchema);

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInPayload>({ resolver });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const dispatch = useDispatch();

  const isFormDisable = authStatus === DataStatus.PENDING;

  const onSubmit = (data: SignInPayload): void => {
    dispatch(authActions.signIn(data));
  };

  return (
    <section className={ styles.signInBlock }>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={ isFormDisable } className={ styles.fieldset }>
          <label>
            { UserCreatePayloadKey.EMAIL }
            <input
              type={InputType.EMAIL}
              { ...register(UserCreatePayloadKey.EMAIL) } />
            <p>{errors.email}</p>
          </label>
          <label>
            { UserCreatePayloadKey.PASSWORD }
            <input
              type={ InputType.PASSWORD }
              { ...register(UserCreatePayloadKey.PASSWORD) }
            />
            <p>{errors.password}</p>
          </label>
          <button
            type={ ButtonType.SUBMIT }
          >
            Submit
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default SignIn;
