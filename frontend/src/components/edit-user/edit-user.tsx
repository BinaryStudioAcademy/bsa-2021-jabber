import { AppRoute, DataStatus } from 'common/enums/enums';
import { RootState, UserEditPayload } from 'common/types/types';
import { Loader, Redirect } from 'components/common/common';
import { useAppSelector, useParams, useEffect, useDispatch } from 'hooks/hooks';
import {
  userProfile as userProfileActions,
  configurateUser as configurateUserActions,
} from 'store/actions';
import { PageParams } from './common/types/page-params.type';
import { mapUserToFormPayload } from './helpers/helpers';
import EditUserForm from './components/edit-user-form/edit-user-form';
import styles from './styles.module.scss';

const EditUser: React.FC = () => {
  const { id } = useParams<PageParams>();

  const { currentUser, user, dataStatus } = useAppSelector(
    ({ auth, userProfile }: RootState) => ({
      currentUser: auth.user,
      user: userProfile.user,
      dataStatus: userProfile.dataStatus,
    }),
  );

  const dispatch = useDispatch();

  const isFormDisabled = dataStatus === DataStatus.PENDING;
  const hasPermitToEdit = currentUser?.id === Number(id);

  useEffect(() => {
    if (!hasPermitToEdit) {
      return;
    }

    dispatch(userProfileActions.loadUser(Number(id)));
  }, [id]);

  const handleFormSubmit = (payload: UserEditPayload): void => {
    dispatch(configurateUserActions.editUser(payload));
  };

  const mappedUser = user ? mapUserToFormPayload(user) : undefined;

  if (!hasPermitToEdit) {
    return <Redirect to={`${AppRoute.USERS_EDIT}/${currentUser?.id}`} />;
  }

  if (isFormDisabled) {
    return <Loader />;
  }

  return (
    <div className={styles.editUser}>
      <h2>Edit user</h2>
      {mappedUser && (
        <EditUserForm
          disabled={isFormDisabled}
          defaultValues={mappedUser}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default EditUser;
