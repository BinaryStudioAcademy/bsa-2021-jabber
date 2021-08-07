import { CommentCreatePayloadKey, ButtonType } from 'common/enums/enums';
import { CommentCreatePayload, User } from 'common/types/types';
import { useAppForm } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { commentCreate as commentCreateSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_COMMENT_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  user: User;
  onSubmit: (payload: CommentCreatePayload) => void;
};

const CreateCommentForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: commentCreateSchema,
    defaultValues: DEFAULT_CREATE_COMMENT_PAYLOAD,
  });
  const isAuth = Boolean(user);

  return (
    <>
      {isAuth
        ? (<form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
          <fieldset className={styles.fieldset}>
            <Input
              name={CommentCreatePayloadKey.TEXT}
              control={control}
              errors={errors}
              label=""
              placeholder="Write a comment"
            />
            <Button label="Save" type={ButtonType.SUBMIT} />
          </fieldset>
        </form >)
        : (
          <div>
            <span>You need to sign in or sign up to write comment</span>
          </div>
        )}
    </>
  );
};

export default CreateCommentForm;
