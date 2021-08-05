import { Option } from 'common/types/types';

const getOptions = (options:string[]):Option[] =>{
  const selectOptions:Option[] = options.map((item)=>{
    return { label: item, value: item };
  });
  return selectOptions;
};

export { getOptions };
