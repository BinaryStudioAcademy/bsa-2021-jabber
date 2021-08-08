import { CommentCreatePayloadKey, ButtonType, AppRoute } from 'common/enums/enums';
import { CommentCreatePayload, User } from 'common/types/types';
import { useAppForm } from 'hooks/hooks';
import { Input, Button, Link } from 'components/common/common';
import { comment as commentCreateValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_COMMENT_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  user: User | null;
  onSubmit: (payload: CommentCreatePayload) => void;
};

const CreateCommentForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: commentCreateValidationSchema,
    defaultValues: DEFAULT_CREATE_COMMENT_PAYLOAD,
  });
  const isAuth = Boolean(user);

  if (!isAuth) {
    return (
      <div className={styles.noAuth}>
        <span>
          You need to
          <Link
            to={AppRoute.SIGN_IN}
            className={styles.link}
          >
            {' '}
            Sign In
            {' '}
          </Link>
          or
          <Link
            to={AppRoute.SIGN_UP}
            className={styles.link}
          >
            {' '}
            Sign Up
            {' '}
          </Link>
          to write a comment
        </span>
      </div>
    );
  }

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
