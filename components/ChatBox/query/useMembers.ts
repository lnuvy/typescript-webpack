import { useQuery } from 'react-query';

export const userMembers = (workspace: string) => {
  return useQuery(`/api/workspaces/${workspace}/members`, )
}