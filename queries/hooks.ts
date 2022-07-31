import { useQuery } from 'react-query';
import { options } from './options';
import { fetcher } from './fetcher';

export const useUser = () => useQuery(`/api/users`, fetcher, options);

// export const
