import { useQuery } from 'react-query';
import { fetcher } from '@queries/fetcher';

export const userMembers = (workspace: string) => {
  return useQuery(`/api/workspaces/${workspace}/members`, )
}

export const useGetUser = () => useQuery([`/api/member`], fetcher)

// export const useGetMemebers = () => useQuery()

// export const useGetChatList = () => useQuery()