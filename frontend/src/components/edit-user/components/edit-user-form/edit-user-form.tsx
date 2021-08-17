import { useAppForm } from 'hooks/hooks';
import { User, UserEditFormPayload } from 'common/types/types';
import {
  UserPayloadKey,
  InputType,
  ButtonType,
  ButtonColor,
  AppRoute,
} from 'common/enums/enums';
import { Button, Datepicker, Input, ImagePreviewControl } from 'components/common/common';
import { editUser as editUserValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  disabled: boolean;
  defaultValues: UserEditFormPayload;
  onSubmit: (payload: UserEditFormPayload) => void;
  user: User | null;
};

const EditUserForm: React.FC<Props> = ({
  disabled,
  defaultValues,
  onSubmit,
  user,
}) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: editUserValidationSchema,
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.editUserForm}>
      <fieldset disabled={disabled}>
        <ImagePreviewControl
          label="avatar image"
          name={UserPayloadKey.IMAGE}
          control={control}
          errors={errors}
          imageUrl={user?.image?.url}
        />
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
        <div className={styles.btnsWrapper}>
          <Button
            label="Edit"
            className={styles.btnSave}
            type={ButtonType.SUBMIT}
          />
          <Button
            className={styles.btnCancel}
            buttonColor={ButtonColor.LIGHT_PINK}
            label="Cancel"
            type={ButtonType.SUBMIT}
            href={`${AppRoute.USERS}/${user?.id}`}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default EditUserForm;
