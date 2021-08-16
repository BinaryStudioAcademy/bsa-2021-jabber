import { useAppForm } from 'hooks/hooks';
import { UserEditPayload } from 'common/types/types';
import { UserPayloadKey, InputType, ButtonType } from 'common/enums/enums';
import { Button, Datepicker, Input } from 'components/common/common';
import { userEdit as userEditValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { UserFormPayload } from 'common/types/user/user-form-payload.type';

type Props = {
  disabled: boolean;
  defaultValues: UserFormPayload;
  onSubmit: (payload: UserEditPayload) => void;
};

const EditUserForm: React.FC<Props> = ({
  disabled,
  defaultValues,
  onSubmit,
}) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: userEditValidationSchema,
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.editUserForm}>
      <fieldset disabled={disabled}>
        <Input
          label="First name"
          placeholder="Enter your name"
          name={UserPayloadKey.FIRST_NAME}
          control={control}
          errors={errors}
        />
        <Input
          label="Last name"
          placeholder="Enter your last name"
          name={UserPayloadKey.LAST_NAME}
          control={control}
          errors={errors}
        />
        <Input
          label="Nickname"
          placeholder="Enter your nickname"
          name={UserPayloadKey.NICKNAME}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name={UserPayloadKey.EMAIL}
          control={control}
          errors={errors}
        />
        <Datepicker
          label="Birthdate"
          name={UserPayloadKey.BIRTHDATE}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.TEXT}
          label="Bio"
          placeholder="Enter your bio"
          name={UserPayloadKey.BIO}
          control={control}
          errors={errors}
          hasMultipleRows
        />
        <Button
          label="Edit"
          className={styles.button}
          type={ButtonType.SUBMIT}
        />
      </fieldset>
    </form>
  );
};

export default EditUserForm;
