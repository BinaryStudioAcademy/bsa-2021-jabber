import defaultLogo from 'assets/img/default-notifications.png';
import newNotificationEye from 'assets/img/eye.svg';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

const NotificationItem: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.notificationLogo}>
          <img
            className={styles.image}
            src={defaultLogo}
            width="40"
            height="40"
          />
        </div>
        <div className={styles.notificationInfo}>
          <h2 className={styles.infoTitle}>Lorem ipsum dolor sit amet.</h2>
          <p className={styles.notificationText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            accusamus eius laborum magnam labore inventore sit? Dolorem
            blanditiis dolore qui sequi eius ex facere! Exercitationem vero,
            modi, expedita velit nesciunt voluptates voluptas natus vel, sequi
            dolorem aut fuga. Adipisci molestiae aliquid non error assumenda
            expedita natus incidunt atque sint ex!
          </p>
          <Link to={AppRoute.NOTIFICATIONS} className={styles.link}>
            See message
          </Link>
        </div>
        <div className={styles.notificationStatus}>
          <button className={styles.buttonEye}>
            <img src={newNotificationEye} width="25" height="25" />
          </button>
          <span className={styles.notificationDate}>09:31</span>
        </div>
      </div>
      <div className={styles.containerChecked}>
        <div className={styles.notificationLogo}>
          <img
            className={styles.image}
            src={defaultLogo}
            width="40"
            height="40"
          />
        </div>
        <div className={styles.notificationInfo}>
          <h2 className={styles.infoTitle}>Lorem ipsum dolor sit amet.</h2>
          <p className={styles.notificationText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            accusamus eius laborum magnam labore inventore sit? Dolorem
            blanditiis dolore qui sequi eius ex facere! Exercitationem vero,
            modi, expedita velit nesciunt voluptates voluptas natus vel, sequi
            dolorem aut fuga. Adipisci molestiae aliquid non error assumenda
            expedita natus incidunt atque sint ex!
          </p>
          <Link to={AppRoute.ANY} className={styles.link}>
            See message
          </Link>
        </div>
        <div className={styles.notificationStatus}>
          <img
            src={newNotificationEye}
            className={styles.eyeButton}
            width="25"
            height="25"
          />
          <span className={styles.notificationDate}>09:31</span>
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
