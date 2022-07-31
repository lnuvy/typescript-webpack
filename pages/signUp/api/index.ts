import axios, { AxiosResponse } from 'axios';

// interface reqParams {
//   inputs: Object;
//   password: string;
// }

export const registerAPI = (inputs: any, password: string) =>
  axios
    .post('/api/users', {
      email: inputs.email,
      nickname: inputs.nickname,
      password,
    })
    .then((res: AxiosResponse) => {
      console.log(res);
      if (res.data === 'ok') return true;
    })
    // 여기 타입 못찾겠음.. Error | AxiosError 아님
    .catch((err: any) => {
      console.log(err.response);
      return err.response.data;
    });

