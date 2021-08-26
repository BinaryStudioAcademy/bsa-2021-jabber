import { UserResetPasswordPayload } from 'common/types/types';
import {
  ButtonType,
  DataStatus,
  InputType,
  UserPayloadKey,
} from 'common/enums/enums';
import { resetPassword as resetPasswordValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input } from 'components/common/common';
import { DEFAULT_RESET_PASSWORD_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: UserResetPasswordPayload) => void;
};

const ResetPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: resetPasswordValidationSchema,
    defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const isFormDisable = authStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>Reset Password</h1>
      <div className={styles.formSubtitle}>
        Please enter your email address to reset your password.
      </div>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name={UserPayloadKey.EMAIL}
          control={control}
          errors={errors}
        />
        <Button label="Sign In" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default ResetPasswordForm;
