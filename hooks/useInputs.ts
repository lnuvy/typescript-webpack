import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

const useInputs = <T = any>(initialData: T): ReturnTypes => {
  const [values, setValues] = useState(initialData);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
      console.log(values);
      setValues({ ...values, [name]: value });
    },
    [values],
  );
  return [values, handler];
};
export default useInputs;
