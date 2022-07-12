import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export const fetcher = (ctx: QueryFunctionContext) => {
  const queryKey = ctx.queryKey[0];
  const params = ctx.queryKey.map((k, i) => {
    if (i !== 0) return k;
  });
  console.log('fetcher 함수');
  console.log(queryKey, params);

  return axios.get(`${queryKey}`, { params, withCredentials: true }).then(({ data }) => data);
};

// const get = async (url: string, params: Params) => {
//   const { data } = await axios.get(url, {
//     params,
//   })
//   return data
// }
