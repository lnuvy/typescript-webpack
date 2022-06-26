import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

// initialData 가 계속 덮어씌워져서 디펜던시 어레이에 밸류를 넣어야함
const useInputs = <T = any>(initialData: T): ReturnTypes => {
  const [values, setValues] = useState(initialData);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    [values],
  );
  return [values, handler];
};
export default useInputs;
