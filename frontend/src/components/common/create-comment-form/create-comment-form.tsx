import { CommentCreatePayloadKey, ButtonType, DataStatus } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';
import { useAppForm, useAppSelector, useEffect } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { comment as commentCreateValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_COMMENT_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: CommentFormCreatePayload) => void;
};

const CreateCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, isSubmitSuccessful, reset } = useAppForm({
    validationSchema: commentCreateValidationSchema,
    defaultValues: DEFAULT_CREATE_COMMENT_PAYLOAD,
  });

  const { commentDataStatus } = useAppSelector(({ episode }) => ({
    commentDataStatus: episode.commentDataStatus,
  }));

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const isFormDisable = commentDataStatus === DataStatus.PENDING;

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
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
