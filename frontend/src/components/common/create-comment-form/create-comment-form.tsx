import { CommentCreatePayloadKey, ButtonType } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { useAppForm, useEffect } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { comment as commentCreateValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_COMMENT_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: CommentFormCreatePayload) => void;
  isDisabled: boolean;
};

const CreateCommentForm: React.FC<Props> = ({ onSubmit, isDisabled }) => {
  const { control, handleSubmit, errors, isSubmitSuccessful, reset } = useAppForm({
    validationSchema: commentCreateValidationSchema,
    defaultValues: DEFAULT_CREATE_COMMENT_PAYLOAD,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
      <fieldset disabled={isDisabled} className={styles.fieldset}>
        <Input
          name={CommentCreatePayloadKey.TEXT}
          control={control}
          errors={errors}
          label=""
          placeholder="Write a comment"
        />
        <Button
          label="Add comment"
          type={ButtonType.SUBMIT}
        />
      </fieldset>
    </form >
  );
};

export default CreateCommentForm;
