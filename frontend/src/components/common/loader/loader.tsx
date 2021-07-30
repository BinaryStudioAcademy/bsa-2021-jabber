import styles from './styles.module.scss';

type Props = {
  size?: 'small' | 'medium' | 'large';
  color?: ''
};

const Loader: React.FC<Props> = ({ size = 'medium' }) => (
  <div className={styles.loaderOverlay}>
    <svg className={styles.loaderImage}
      fill="#eff0f7"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size === 'large' ? 50 : size === 'medium' ? 35 : 25}
    >
      <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
      </path>
    </svg>
  </div>
);

export default Loader;
