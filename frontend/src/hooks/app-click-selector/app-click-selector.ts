import React from 'react';

type VisibleHookType = {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const useVisible = (isInitialIsVisible: boolean): VisibleHookType => {
  const [isVisible, setIsVisible] = React.useState<boolean>(isInitialIsVisible);
  const ref = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = (evt: MouseEvent): void => {
    const element = evt.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setIsVisible(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, {
      capture: true,
    });
    return (): void => {
      document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, []);
  return { ref, isVisible, setIsVisible };
};

export { useVisible };
