import { useEffect, useState, useRef } from 'hooks/hooks';

type VisibleHookType = {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const useVisible = (isInitialIsVisible: boolean): VisibleHookType => {
  const [isVisible, setIsVisible] = useState<boolean>(isInitialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (evt: MouseEvent): void => {
    const element = evt.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
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
