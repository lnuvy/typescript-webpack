import { useQuery } from 'react-query';
import { options } from './options';
import { fetcher } from './fetcher';
import { IChannel, IUser } from '@typings/db';
import { paramsFetcher } from '@queries/paramsFetcher';

export const useUser = () => useQuery<IUser | false>([`/api/users`], fetcher, options);

export const useWorkSpaceMember = ({ workspace }: { workspace: string | undefined }) =>
  useQuery([`/workspaces/${workspace}/members`], paramsFetcher, {
    ...options,
    enabled: !!workspace,
  });

export const useChannelData = ({ workspace }: { workspace: string | undefined }) =>
  useQuery<IChannel[]>([`/api/workspaces/${workspace}/channels`, { workspace }], paramsFetcher, {
    ...options,
    enabled: !!workspace,
  });
