import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export const paramsFetcher = (ctx: QueryFunctionContext) => {
  const queryKey = ctx.queryKey[0]

  return axios.get(`${queryKey}`, { withCredentials: true }).then(({ data }) => data);
};