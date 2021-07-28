import './header.css';
import { useSelector } from 'hooks/hooks';
import { RootState } from '../../common/types/types';
import avatar from '../../assets/img/default-user-avatar.svg';

const Header: React.FC = () => {
  const { sessionUser } = useSelector(({ auth }: RootState) => ({
    sessionUser: auth.sessionUser,
  }));

  return (
    <div className="container">
      <div className="LogoContainer">
        <div className="LogoContainerLogo"></div>
        <span>Logo</span>
      </div>

      <div className="navigation">
        <span className="spanNavigation activeSpanNavigation">Podcasts</span>
        <span className="spanNavigation">Streaming</span>
        <span className="spanNavigation">Setting</span>
      </div>

      {sessionUser ? (
        <div className="userInfo">
          <button className="userInfoCreateButton">
            <span className="userInfoCreateButtonText">
              + Create Podcast
            </span>
          </button>

          <div className="notifications">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bell"
              className="svg-inline--fa fa-bell fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
              ></path>
            </svg>
            <div className="notificationActive"></div>
          </div>

          <div className="profile">
            <img className="profileAvatar" src={avatar} alt="Kiwi standing on oval" />
          </div>
        </div>
      ) : (
        <div className="signIn">
          <a href="#" className="signInText">
            Sign In
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
