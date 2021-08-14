import { DataStatus } from 'common/enums/enums';
import { RootState, UserEditPayload } from 'common/types/types';
import { Loader } from 'components/common/common';
import { useAppSelector, useParams, useEffect, useDispatch } from 'hooks/hooks';
import { userProfile as userProfileActions } from 'store/actions';
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

  useEffect(() => {
    dispatch(userProfileActions.loadUser(Number(id)));
  }, []);

  const isFormDisabled = dataStatus === DataStatus.PENDING;
  const hasPermitToEdit = currentUser?.id === Number(id);

  const handleFormSubmit = (payload: UserEditPayload): void => {
    dispatch(userProfileActions.updateUser(payload));
  };

  const mappedUser = user ? mapUserToFormPayload(user) : undefined;

  if (!hasPermitToEdit) {
    return (
      <div className={styles.doNotHavePermission}>
        <h1>You do not have permission</h1>
      </div>
    );
  }

  if (isFormDisabled) {
    return <Loader />;
  }

  if (!mappedUser) {
    return null;
  }

  return (
    <div className={styles.editUser}>
      <h2>Edit user</h2>
      <EditUserForm
        disabled={isFormDisabled}
        defaultValues={mappedUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EditUser;
