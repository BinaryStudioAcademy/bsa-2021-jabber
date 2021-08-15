import { StylesConfig } from 'react-select';
import { Option } from 'common/types/types';

const styles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    padding: '5px 12px',
    cursor: 'pointer',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: 0,
  }),
};

export { styles };
