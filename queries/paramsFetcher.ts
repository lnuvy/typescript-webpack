import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export const paramsFetcher = (ctx: QueryFunctionContext) => {
  const queryKey = ctx.queryKey[0];

  console.log('parasFetcher 의 쿼리키 : ', queryKey);

  return axios.get(`${queryKey}`, { withCredentials: true }).then(({ data }) => data);
};
