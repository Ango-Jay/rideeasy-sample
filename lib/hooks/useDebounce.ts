import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

const useDebounce = ({ value, delay = 500 }: args): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounced = debounce((newValue: string) => {
      setDebouncedValue(newValue);
    }, delay);

    debounced(value);

    return () => {
      debounced.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};
interface args {
  value: string;
  delay?: number;
}
export default useDebounce;
