import { useQuery } from 'react-query';
import { options } from './options';
import { fetcher } from './fetcher';

export const useUser = () => {
  const result = useQuery(`/api/users`, fetcher, options);
  return result;
};

// export const
