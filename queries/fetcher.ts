import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export const fetcher = (ctx: QueryFunctionContext) => {
  const queryKey = ctx.queryKey[0];

  // const params = ctx.queryKey.reduce((prev: any, item: any, i) => {
  //   if (i !== 0) {
  //     const newObj = { ...prev, ...item };
  //     return newObj;
  //   }
  // }, {});
  // console.log(params);

  const params = ctx.queryKey.filter((k, i) => {
    if (i !== 0) return k;
  });
  console.log(ctx.queryKey[1]);
  console.log('fetcher 함수');
  console.log(queryKey, params);

  return axios.get(`${queryKey}`, { params, withCredentials: true }).then(({ data }) => data);
};