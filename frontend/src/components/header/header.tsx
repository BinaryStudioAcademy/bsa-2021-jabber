import './header.scss';
//import { useSelector } from 'hooks/hooks';
//import { RootState } from '../../common/types/types';
//import { DataStatus } from 'common/enums/enums'; //'../../common/enums/'

const Header: React.FC = () => {
  //const { isLogged } = useSelector(({ counter }: RootState) => ({
  //  isLogged: counter.mockedUser,
  //}));
  const is = false;
  return (
    <div className="header">
      <div className="header--logo-container">
        <div className="header--logo-container--logo"></div>
        <span>Logo</span>
      </div>

      <div className="header--navigation">
        <span className="header--navigation--active">Podcasts</span>
        <span>Streaming</span>
        <span>Setting</span>
      </div>

      {is ? (
        <a href="#" className="header--login-field">
          Sign In...
        </a>
      ) : (
        <div className="header--users-info">
          <button className="header--create-button">
            <span className="header--create-button--text">
              + Create Podcast
            </span>
          </button>

          <div className="header--notifications">
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
            <div className="header--notifications--circle"></div>
          </div>

          <div className="header--profile">
            <img
              className="header--profile-avatar"
              alt="avatar"
              src="data:image/png;base64,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"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
