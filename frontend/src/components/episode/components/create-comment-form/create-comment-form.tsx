import { CommentCreatePayloadKey, ButtonType } from 'common/enums/enums';
import { CommentCreatePayload } from 'common/types/types';
import { useAppForm } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { comment as commentCreateValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_COMMENT_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: CommentCreatePayload) => void;
};

const CreateCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: commentCreateValidationSchema,
    defaultValues: DEFAULT_CREATE_COMMENT_PAYLOAD,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <fieldset className={styles.fieldset}>
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
